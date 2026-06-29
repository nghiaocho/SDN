import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, Clock, XCircle, BookOpen, AlertCircle } from "lucide-react";
import * as rentalService from "../service/rental.service";
import { useAuth } from "../context/AuthContext";

const MyRentals = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(location.state?.success || "");

  const fetchRentals = async () => {
    try {
      const data = await rentalService.getMyRentals();
      // Lọc các rentals thuộc về user hiện tại
      // Chú ý: Backend populate user_id
      const userId = user.id || user._id;
      const myRentals = data.filter(r => r.user_id?._id === userId || r.user_id === userId);
      
      // Sort: newest first
      myRentals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRentals(myRentals);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load rentals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
    
    // Clear success message after 5 seconds
    if (successMsg) {
        const timer = setTimeout(() => setSuccessMsg(""), 5000);
        return () => clearTimeout(timer);
    }
  }, [user.id, user._id]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this rental request?")) return;
    
    try {
        await rentalService.cancelRental(id);
        setSuccessMsg("Rental request cancelled successfully.");
        fetchRentals(); // Reload list
    } catch (err) {
        setError(err.response?.data?.message || "Failed to cancel rental");
    }
  };

  const getStatusBadge = (status) => {
      switch (status) {
          case 'pending':
              return <span className="rental-badge bg-warning/10 text-warning border border-warning/20"><Clock size={14}/> Pending</span>;
          case 'accepted':
              return <span className="rental-badge bg-info/10 text-info border border-info/20"><CheckCircle size={14}/> Accepted</span>;
          case 'borrowed':
              return <span className="rental-badge bg-secondary/10 text-secondary border border-secondary/20"><BookOpen size={14}/> Borrowed</span>;
          case 'returned':
              return <span className="rental-badge bg-success/10 text-success border border-success/20"><CheckCircle size={14}/> Returned</span>;
          case 'cancelled':
              return <span className="rental-badge bg-error/10 text-error border border-error/20"><XCircle size={14}/> Cancelled</span>;
          default:
              return <span className="rental-badge bg-surface text-text-muted border border-border">{status}</span>;
      }
  };

  const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Rentals</h1>

      {successMsg && (
        <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg mb-6 flex items-center gap-3 animate-fade-in">
            <CheckCircle size={18} />
            <p>{successMsg}</p>
        </div>
      )}

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
            <AlertCircle size={18} />
            <p>{error}</p>
        </div>
      )}

      {rentals.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-xl border border-border">
              <BookOpen size={48} className="mx-auto text-text-muted mb-4" opacity={0.5} />
              <h3 className="text-xl font-semibold mb-2">No rentals yet</h3>
              <p className="text-text-muted">You haven't requested any books. Go explore our library!</p>
          </div>
      ) : (
          <div className="space-y-6">
              {rentals.map(rental => (
                  <div key={rental._id} className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-border bg-bg-secondary flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center gap-4">
                              <span className="text-sm text-text-muted">ID: <span className="font-mono text-text">{rental._id.slice(-6).toUpperCase()}</span></span>
                              <span className="text-sm text-text-muted">Req: <span className="text-text">{formatDate(rental.rent_date)}</span></span>
                              <span className="text-sm text-text-muted">Due: <span className="text-text">{formatDate(rental.due_date)}</span></span>
                          </div>
                          <div className="flex items-center gap-4">
                              {getStatusBadge(rental.status)}
                              {rental.status === 'pending' && (
                                  <button 
                                    onClick={() => handleCancel(rental._id)}
                                    className="text-sm text-error hover:underline transition-all"
                                  >
                                      Cancel
                                  </button>
                              )}
                          </div>
                      </div>

                      {/* Items */}
                      <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {rental.items.map((item, idx) => (
                                  <div key={idx} className="flex gap-4">
                                      <img 
                                        src={`/images/${item.book_id?.cover_image}.jpg`} 
                                        alt={item.book_id?.title} 
                                        className="w-16 h-24 object-cover rounded-md border border-border"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/64x96?text=No+Cover" }}
                                      />
                                      <div className="flex flex-col justify-center">
                                          <h4 className="font-semibold text-text line-clamp-2">{item.book_id?.title || "Unknown Book"}</h4>
                                          <p className="text-sm text-text-muted mt-1">Qty: {item.quantity}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default MyRentals;
