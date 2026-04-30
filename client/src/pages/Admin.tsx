import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Mail, Phone, Calendar, Users, MessageSquare, BookOpen, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type BookingStatus = "pending" | "contacted" | "confirmed" | "cancelled";

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50",
  contacted: "bg-blue-500/20 text-blue-400 border border-blue-500/50",
  confirmed: "bg-green-500/20 text-green-400 border border-green-500/50",
  cancelled: "bg-red-500/20 text-red-400 border border-red-500/50",
};

const STATUS_ICONS: Record<BookingStatus, typeof Clock> = {
  pending: Clock,
  contacted: MessageSquare,
  confirmed: CheckCircle,
  cancelled: XCircle,
};

export default function Admin() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"newsletter" | "contact" | "bookings">("newsletter");
  const [expandedContact, setExpandedContact] = useState<number | null>(null);

  const newsletterQuery = trpc.newsletter.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const contactQuery = trpc.contact.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const bookingsQuery = trpc.booking.list.useQuery(undefined, { enabled: user?.role === "admin" });

  const markReadMutation = trpc.contact.markRead.useMutation({
    onSuccess: () => {
      contactQuery.refetch();
      toast.success("Marked as read");
    },
  });

  const updateStatusMutation = trpc.booking.updateStatus.useMutation({
    onSuccess: () => {
      bookingsQuery.refetch();
      toast.success("Status updated");
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🔒</div>
          <h1 className="text-white text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">You need admin privileges to view this page.</p>
          <a href="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-bold transition-colors">
            Back to Website
          </a>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "newsletter" as const, label: "Newsletter", icon: Users, count: newsletterQuery.data?.length ?? 0 },
    { id: "contact" as const, label: "Contact", icon: MessageSquare, count: contactQuery.data?.length ?? 0 },
    { id: "bookings" as const, label: "Bookings", icon: Calendar, count: bookingsQuery.data?.length ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-900 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
              <ArrowLeft size={18} />
              <span className="text-sm">Back to Site</span>
            </a>
            <div className="w-px h-6 bg-gray-800" />
            <h1 className="text-xl font-bold text-white">
              <span className="text-red-500">ASHRUTA</span> Admin
            </h1>
          </div>
          <div className="text-sm text-gray-400">
            Logged in as <span className="text-white font-semibold">{user.name || user.email}</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-950 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-4">
          <div className="bg-black rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl font-bold text-red-500">{newsletterQuery.data?.length ?? "—"}</div>
            <div className="text-gray-400 text-sm mt-1">Newsletter Subscribers</div>
          </div>
          <div className="bg-black rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl font-bold text-red-500">{contactQuery.data?.length ?? "—"}</div>
            <div className="text-gray-400 text-sm mt-1">Contact Messages</div>
          </div>
          <div className="bg-black rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-3xl font-bold text-red-500">{bookingsQuery.data?.length ?? "—"}</div>
            <div className="text-gray-400 text-sm mt-1">Booking Inquiries</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-900">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-red-600 text-red-500"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {tab.label}
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-red-600/20 text-red-400" : "bg-gray-800 text-gray-500"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Newsletter Tab */}
        {activeTab === "newsletter" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Newsletter Subscribers</h2>
            {newsletterQuery.isLoading ? (
              <div className="text-gray-400 animate-pulse">Loading...</div>
            ) : newsletterQuery.data?.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Users size={48} className="mx-auto mb-4 opacity-30" />
                <p>No subscribers yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800 text-left">
                      <th className="pb-3 text-gray-400 text-sm font-semibold">#</th>
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Email</th>
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Name</th>
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Status</th>
                      <th className="pb-3 text-gray-400 text-sm font-semibold">Subscribed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletterQuery.data?.map((sub, i) => (
                      <tr key={sub.id} className="border-b border-gray-900 hover:bg-gray-950 transition-colors">
                        <td className="py-3 text-gray-500 text-sm">{i + 1}</td>
                        <td className="py-3 text-white font-medium">{sub.email}</td>
                        <td className="py-3 text-gray-300">{sub.name || "—"}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            sub.isActive
                              ? "bg-green-500/20 text-green-400 border border-green-500/50"
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                          }`}>
                            {sub.isActive ? "Active" : "Unsubscribed"}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400 text-sm">
                          {new Date(sub.subscribedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Contact Messages</h2>
            {contactQuery.isLoading ? (
              <div className="text-gray-400 animate-pulse">Loading...</div>
            ) : contactQuery.data?.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
                <p>No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contactQuery.data?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-gray-950 rounded-lg border transition-colors ${
                      msg.isRead ? "border-gray-800" : "border-red-600/50"
                    }`}
                  >
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedContact(expandedContact === msg.id ? null : msg.id)}
                    >
                      <div className="flex items-center gap-4">
                        {!msg.isRead && (
                          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-white">{msg.name}</span>
                            <span className="text-gray-500 text-sm">{msg.email}</span>
                          </div>
                          <div className="text-gray-400 text-sm mt-0.5">{msg.subject}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-xs">
                          {new Date(msg.submittedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                        {expandedContact === msg.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                      </div>
                    </div>
                    {expandedContact === msg.id && (
                      <div className="px-4 pb-4 border-t border-gray-800 pt-4">
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">{msg.message}</p>
                        <div className="flex items-center gap-3">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-semibold transition-colors flex items-center gap-2"
                          >
                            <Mail size={14} />
                            Reply via Email
                          </a>
                          {!msg.isRead && (
                            <button
                              onClick={() => markReadMutation.mutate({ id: msg.id })}
                              className="px-4 py-2 border border-gray-700 hover:border-gray-500 rounded text-gray-400 hover:text-white text-sm font-semibold transition-colors flex items-center gap-2"
                            >
                              <CheckCircle size={14} />
                              Mark as Read
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Booking Inquiries</h2>
            {bookingsQuery.isLoading ? (
              <div className="text-gray-400 animate-pulse">Loading...</div>
            ) : bookingsQuery.data?.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                <p>No booking inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookingsQuery.data?.map((booking) => {
                  const status = booking.status as BookingStatus;
                  const StatusIcon = STATUS_ICONS[status];
                  return (
                    <div key={booking.id} className="bg-gray-950 rounded-lg border border-gray-800 p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-white text-lg">{booking.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${STATUS_COLORS[status]}`}>
                              <StatusIcon size={12} />
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><Mail size={12} />{booking.email}</span>
                            {booking.phone && <span className="flex items-center gap-1"><Phone size={12} />{booking.phone}</span>}
                          </div>
                        </div>
                        <span className="text-gray-500 text-xs">
                          {new Date(booking.submittedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {booking.eventDate && (
                          <div className="bg-black rounded p-3">
                            <div className="text-gray-500 text-xs mb-1">Event Date</div>
                            <div className="text-white text-sm font-semibold">{booking.eventDate}</div>
                          </div>
                        )}
                        {booking.eventType && (
                          <div className="bg-black rounded p-3">
                            <div className="text-gray-500 text-xs mb-1">Event Type</div>
                            <div className="text-white text-sm font-semibold">{booking.eventType}</div>
                          </div>
                        )}
                        {booking.venue && (
                          <div className="bg-black rounded p-3">
                            <div className="text-gray-500 text-xs mb-1">Venue</div>
                            <div className="text-white text-sm font-semibold">{booking.venue}</div>
                          </div>
                        )}
                        {booking.city && (
                          <div className="bg-black rounded p-3">
                            <div className="text-gray-500 text-xs mb-1">City</div>
                            <div className="text-white text-sm font-semibold">{booking.city}</div>
                          </div>
                        )}
                      </div>

                      {booking.message && (
                        <p className="text-gray-400 text-sm mb-4 bg-black rounded p-3">{booking.message}</p>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-500 text-xs mr-2">Update Status:</span>
                        {(["pending", "contacted", "confirmed", "cancelled"] as BookingStatus[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatusMutation.mutate({ id: booking.id, status: s })}
                            disabled={status === s || updateStatusMutation.isPending}
                            className={`px-3 py-1 rounded text-xs font-semibold transition-colors disabled:opacity-40 ${
                              status === s
                                ? STATUS_COLORS[s]
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                          >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </button>
                        ))}
                        <a
                          href={`mailto:${booking.email}?subject=Re: Booking Inquiry`}
                          className="ml-auto px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded text-white text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <Mail size={12} />
                          Reply
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
