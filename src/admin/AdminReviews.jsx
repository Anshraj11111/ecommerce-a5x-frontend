import React, { useState, useEffect } from 'react';
import { Check, X, Star, Calendar, User, Mail, MessageSquare, Trash2, Eye } from 'lucide-react';
import { API_BASE } from '../config/constants';

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('a5x-admin-token');
      if (!token) {
        console.error('No admin token found');
        setLoading(false);
        return;
      }
      const response = await fetch(`${API_BASE}/api/reviews/admin/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error('Failed to fetch reviews:', response.status, errData);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('a5x-admin-token');
      const response = await fetch(`${API_BASE}/api/reviews/admin/approve/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Update local state
        setReviews(reviews.map(review => 
          review._id === reviewId ? { ...review, approved: true } : review
        ));
        alert('Review approved successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to approve review');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Error approving review');
    }
  };

  const deleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('a5x-admin-token');
      const response = await fetch(`${API_BASE}/api/reviews/admin/delete/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Remove from local state
        setReviews(reviews.filter(review => review._id !== reviewId));
        alert('Review deleted successfully!');
        setSelectedReview(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'pending') return !review.approved;
    if (filter === 'approved') return review.approved;
    return true; // all
  });

  const getStatusBadge = (approved) => {
    return approved ? (
      <span style={{ 
        background: 'rgba(34, 197, 94, 0.1)', 
        color: '#22c55e', 
        padding: '4px 8px', 
        borderRadius: '4px', 
        fontSize: '12px',
        fontWeight: '500'
      }}>
        Approved
      </span>
    ) : (
      <span style={{ 
        background: 'rgba(251, 191, 36, 0.1)', 
        color: '#fbbf24', 
        padding: '4px 8px', 
        borderRadius: '4px', 
        fontSize: '12px',
        fontWeight: '500'
      }}>
        Pending
      </span>
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < rating ? '#fbbf24' : 'none'} 
        color={i < rating ? '#fbbf24' : '#6b7280'} 
      />
    ));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ color: '#8A9BB5' }}>Loading reviews...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#00e5ff', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Review Management
        </h1>
        <p style={{ color: '#8A9BB5', marginBottom: '24px' }}>
          Manage customer reviews and ratings for your kits
        </p>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {[
            { key: 'all', label: 'All Reviews', count: reviews.length },
            { key: 'pending', label: 'Pending', count: reviews.filter(r => !r.approved).length },
            { key: 'approved', label: 'Approved', count: reviews.filter(r => r.approved).length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '8px 16px',
                background: filter === tab.key ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                border: filter === tab.key ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: filter === tab.key ? '#00e5ff' : '#8A9BB5',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredReviews.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '48px', 
            color: '#8A9BB5',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <MessageSquare size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '8px' }}>No reviews found</h3>
            <p>No reviews match the current filter.</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div 
              key={review._id} 
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(0, 229, 255, 0.1)', 
                borderRadius: '12px', 
                padding: '20px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={16} color="#8A9BB5" />
                      <span style={{ color: '#00e5ff', fontWeight: '600' }}>{review.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={16} color="#8A9BB5" />
                      <span style={{ color: '#8A9BB5', fontSize: '14px' }}>{review.email}</span>
                    </div>
                    {getStatusBadge(review.approved)}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {renderStars(review.rating)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} color="#8A9BB5" />
                      <span style={{ color: '#8A9BB5', fontSize: '14px' }}>
                        {new Date(review.createdAt || review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '4px' }}>
                      <strong>Kit ID:</strong> {review.kitId}
                    </p>
                  </div>

                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <p style={{ color: '#e8e8f0', lineHeight: '1.5', margin: 0 }}>
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button
                  onClick={() => setSelectedReview(review)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '6px',
                    color: '#818cf8',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  <Eye size={16} />
                  View Details
                </button>

                {!review.approved && (
                  <button
                    onClick={() => approveReview(review._id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '6px',
                      color: '#22c55e',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                <button
                  onClick={() => deleteReview(review._id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0, 0, 0, 0.8)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedReview(null)}
        >
          <div 
            style={{ 
              background: '#0f1520', 
              border: '1px solid rgba(0, 229, 255, 0.2)', 
              borderRadius: '12px', 
              padding: '24px', 
              maxWidth: '600px', 
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: '#00e5ff', margin: 0 }}>Review Details</h2>
              <button
                onClick={() => setSelectedReview(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8A9BB5',
                  cursor: 'pointer',
                  fontSize: '24px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '4px', display: 'block' }}>
                    Customer Name
                  </label>
                  <p style={{ color: '#e8e8f0', margin: 0 }}>{selectedReview.name}</p>
                </div>
                <div>
                  <label style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '4px', display: 'block' }}>
                    Email
                  </label>
                  <p style={{ color: '#e8e8f0', margin: 0 }}>{selectedReview.email}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '4px', display: 'block' }}>
                    Rating
                  </label>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {renderStars(selectedReview.rating)}
                  </div>
                </div>
                <div>
                  <label style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '4px', display: 'block' }}>
                    Date
                  </label>
                  <p style={{ color: '#e8e8f0', margin: 0 }}>
                    {new Date(selectedReview.createdAt || selectedReview.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '4px', display: 'block' }}>
                    Status
                  </label>
                  {getStatusBadge(selectedReview.approved)}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                  Kit ID
                </label>
                <p style={{ color: '#e8e8f0', margin: 0 }}>{selectedReview.kitId}</p>
              </div>

              <div>
                <label style={{ color: '#8A9BB5', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                  Review Comment
                </label>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  padding: '16px', 
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <p style={{ color: '#e8e8f0', lineHeight: '1.6', margin: 0 }}>
                    "{selectedReview.comment}"
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              {!selectedReview.approved && (
                <button
                  onClick={() => {
                    approveReview(selectedReview._id);
                    setSelectedReview(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '6px',
                    color: '#22c55e',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  <Check size={16} />
                  Approve Review
                </button>
              )}

              <button
                onClick={() => {
                  deleteReview(selectedReview._id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <Trash2 size={16} />
                Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminReviews;