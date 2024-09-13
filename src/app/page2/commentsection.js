"use client"
// components/CommentSection.js
import { useState } from 'react';

const commentsData = [
  {
    id: 1,
    name: 'James',
    date: '12/06/2020',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    likes: 10,
    dislikes: 2,
  },
  {
    id: 2,
    name: 'Arlene',
    date: '12/06/2020',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    likes: 15,
    dislikes: 3,
  },
  {
    id: 3,
    name: 'Arlene',
    date: '12/06/2020',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    likes: 20,
    dislikes: 1,
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        name: 'Current User', // You can change this to a dynamic user name if needed
        date: new Date().toLocaleDateString(),
        text: newComment,
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg', // Default avatar or user avatar
        likes: 0,
        dislikes: 0,
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  return (
    <div className=" mx-auto p-4 bg-black text-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {/* Comment Input Section */}
      <div className="flex items-start space-x-4 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg" // Placeholder image for current user
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <textarea
            className="w-full p-3  bg-gray-100 boder rounded-lg text-gray-300 focus:outline-none  "
            rows="3"
            placeholder="Write your comments here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2  text-white rounded-lg "
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            <img
              src={comment.avatar}
              alt={`${comment.name} Avatar`}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1  p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{comment.name}</h3>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="mt-2 text-gray-300">{comment.text}</p>
              <div className="flex items-center space-x-4 mt-4">
                <button className="flex items-center text-gray-400 hover:text-gray-200">
                  <span className="mr-1">👍</span> {comment.likes}
                </button>
                <button className="flex items-center text-gray-400 hover:text-gray-200">
                  <span className="mr-1">👎</span> {comment.dislikes}
                </button>
                <button className="text-gray-400 hover:text-gray-200">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
