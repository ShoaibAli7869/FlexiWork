import { Lock, Unlock, Clock, DollarSign, Shield, AlertCircle } from "lucide-react";

const statusConfig = {
  funded: {
    label: "Funded",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: Lock,
    iconColor: "text-green-600",
  },
  pending: {
    label: "Pending Funding",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Clock,
    iconColor: "text-yellow-600",
  },
  released: {
    label: "Released",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Unlock,
    iconColor: "text-blue-600",
  },
  disputed: {
    label: "Disputed",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: AlertCircle,
    iconColor: "text-red-600",
  },
};

export const EscrowCard = ({
  amount,
  status = "pending",
  projectTitle,
  milestoneName,
  freelancerName,
  onFund,
  onRelease,
  showActions = true,
  compact = false,
}) => {
  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-white ${config.iconColor}`}>
            <StatusIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              ${amount?.toLocaleString() || "0"}
            </p>
            <p className="text-xs text-gray-500">{config.label}</p>
          </div>
        </div>
        {showActions && status === "pending" && onFund && (
          <button
            onClick={onFund}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Fund
          </button>
        )}
        {showActions && status === "funded" && onRelease && (
          <button
            onClick={onRelease}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Release
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Escrow Protection</span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Amount */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 ${config.iconColor}`}
            >
              <StatusIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${amount?.toLocaleString() || "0"}
              </p>
              <p className="text-sm text-gray-500">
                {status === "funded"
                  ? "Held in escrow"
                  : status === "released"
                  ? "Released to freelancer"
                  : "Awaiting funding"}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        {(projectTitle || milestoneName || freelancerName) && (
          <div className="space-y-2 pt-4 border-t">
            {projectTitle && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Project</span>
                <span className="font-medium text-gray-900">{projectTitle}</span>
              </div>
            )}
            {milestoneName && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Milestone</span>
                <span className="font-medium text-gray-900">{milestoneName}</span>
              </div>
            )}
            {freelancerName && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Freelancer</span>
                <span className="font-medium text-gray-900">{freelancerName}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="mt-4 pt-4 border-t flex gap-2">
            {status === "pending" && onFund && (
              <button
                onClick={onFund}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Fund Escrow
              </button>
            )}
            {status === "funded" && onRelease && (
              <button
                onClick={onRelease}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                Release Funds
              </button>
            )}
            {status === "released" && (
              <div className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm text-center">
                Payment Complete
              </div>
            )}
          </div>
        )}

        {/* Info text */}
        <p className="mt-3 text-xs text-gray-500">
          {status === "funded"
            ? "Funds are held securely until you approve the completed work."
            : status === "pending"
            ? "Fund this milestone to start work. Money is protected until delivery."
            : "Payment has been released to the freelancer."}
        </p>
      </div>
    </div>
  );
};

export default EscrowCard;
