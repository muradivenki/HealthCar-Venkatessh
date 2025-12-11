import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([
    { id: 1, name: "John Doe", role: "Doctor" },
    { id: 2, name: "Jane Smith", role: "Nurse" },
    { id: 3, name: "Mike Johnson", role: "Technician" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignStaff, setAssignStaff] = useState(null);
  const [selectedShift, setSelectedShift] = useState("");

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ id: "", name: "", role: "Doctor" });

  const roles = ["Doctor", "Nurse", "Technician"];
  const shifts = ["Morning", "Afternoon", "Night"];

  // Search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Attendance page
  const handleAttendance = (staff) => navigate("/attendance", { state: staff });

  // Add/Edit staff modal
  const handleAddClick = () => {
    setNewStaff({ id: "", name: "", role: "Doctor" });
    setShowStaffModal(true);
  };

  const handleEditStaff = (staff) => {
    setNewStaff({ ...staff });
    setShowStaffModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setStaffList(staffList.filter((s) => s.id !== id));
    }
  };

  // Assign Shift
  const handleAssign = (staff) => {
    setAssignStaff(staff);
    setSelectedShift("");
    setShowAssignModal(true);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedShift) {
      alert("Please select a shift!");
      return;
    }

    alert(`Shift "${selectedShift}" assigned to ${assignStaff.name} successfully!`);

    setStaffList(
      staffList.map((s) =>
        s.id === assignStaff.id ? { ...s, lastShift: selectedShift } : s
      )
    );
    setShowAssignModal(false);
  };

  // Add/Edit Staff submit
  const handleStaffSubmit = (e) => {
    e.preventDefault();
    if (!newStaff.id || !newStaff.name || !newStaff.role) {
      alert("Please fill all fields!");
      return;
    }

    const exists = staffList.find((s) => s.id === parseInt(newStaff.id));
    if (exists) {
      setStaffList(
        staffList.map((s) =>
          s.id === parseInt(newStaff.id) ? { ...newStaff, id: parseInt(newStaff.id) } : s
        )
      );
    } else {
      setStaffList([...staffList, { ...newStaff, id: parseInt(newStaff.id) }]);
    }
    setShowStaffModal(false);
  };

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toString().includes(searchTerm)
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Staff List Management</h1>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="dashboard-search"
        />
        <button className="btn add-btn" onClick={handleAddClick}>
          + Add Staff
        </button>
      </div>

      <table className="staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Last Shift</th>
            <th>Actions</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.lastShift || "-"}</td>
              <td>
                <button className="btn assign-btn" onClick={() => handleAssign(staff)}>
                  Assign
                </button>
                <button className="btn delete-btn" onClick={() => handleDelete(staff.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button className="btn attendance-btn" onClick={() => handleAttendance(staff)}>
                  Attendance
                </button>
              </td>
            </tr>
          ))}
          {filteredStaff.length === 0 && (
            <tr>
              <td colSpan="6" className="no-records">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Assign Shift Modal */}
      {showAssignModal && assignStaff && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Assign Shift</h2>
            <p><strong>Name:</strong> {assignStaff.name}</p>
            <p><strong>ID:</strong> {assignStaff.id}</p>
            <p><strong>Role:</strong> {assignStaff.role}</p>

            <form onSubmit={handleAssignSubmit}>
              <label>
                Select Shift:
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="modal-input"
                >
                  <option value="">--Select--</option>
                  {shifts.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>

              <div className="modal-actions">
                <button type="submit" className="btn submit-btn">Submit</button>
                <button type="button" className="btn cancel-btn" onClick={() => setShowAssignModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Staff Modal */}
      {showStaffModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{staffList.find((s) => s.id === newStaff.id) ? "Edit Staff" : "Add Staff"}</h2>
            <form onSubmit={handleStaffSubmit}>
              <input
                type="number"
                name="id"
                placeholder="Staff ID"
                value={newStaff.id}
                onChange={(e) => setNewStaff({ ...newStaff, id: e.target.value })}
                disabled={staffList.find((s) => s.id === newStaff.id)}
                className="modal-input"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="modal-input"
              />
              <select
                name="role"
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                className="modal-input"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <div className="modal-actions">
                <button type="submit" className="btn submit-btn">Submit</button>
                <button type="button" className="btn cancel-btn" onClick={() => setShowStaffModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
