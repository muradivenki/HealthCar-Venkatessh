import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Attendance.css";

export default function Attendance() {
  const location = useLocation();
  const navigate = useNavigate();
  const staff = location.state; // { id, name, role }

  const [action, setAction] = useState(""); // "Leave" or "Mark Attendance"

  // Attendance table
  const [attendanceData, setAttendanceData] = useState([
    {
      id: staff.id,
      name: staff.name,
      role: staff.role,
      status: "", // Present / Absent / Leave
      leaveType: "",
      leaveDate: "",
      remarks: "",
    },
  ]);

  // Leave form states
  const [leaveType, setLeaveType] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleActionChange = (e) => {
    setAction(e.target.value);
    // reset forms
    setAttendanceData([
      { id: staff.id, name: staff.name, role: staff.role, status: "", leaveType: "", leaveDate: "", remarks: "" },
    ]);
    setLeaveType("");
    setLeaveDate("");
    setRemarks("");
  };

  // Attendance table handlers
  const handleAttendanceChange = (id, value) => {
    setAttendanceData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: value, leaveType: "", leaveDate: "", remarks: "" } : item
      )
    );
  };

  const handleAttendanceLeaveChange = (id, field, value) => {
    setAttendanceData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    let summary = attendanceData
      .map(
        (s) =>
          `Staff: ${s.name} | Status: ${s.status}${
            s.status === "Leave"
              ? ` | Leave Type: ${s.leaveType} | Date: ${s.leaveDate} | Remarks: ${s.remarks}`
              : ""
          }`
      )
      .join("\n");
    alert(`Attendance submitted successfully!\n\n${summary}`);
    // reset
    setAction("");
    setAttendanceData([
      { id: staff.id, name: staff.name, role: staff.role, status: "", leaveType: "", leaveDate: "", remarks: "" },
    ]);
  };

  // Leave form submit
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveType || !leaveDate) {
      alert("Please select leave type and date!");
      return;
    }
    alert(
      `Leave applied successfully!\nStaff: ${staff.name}\nType: ${leaveType}\nDate: ${leaveDate}\nRemarks: ${remarks}`
    );
    // reset
    setAction("");
    setLeaveType("");
    setLeaveDate("");
    setRemarks("");
  };

  return (
    <div className="attendance-container">
      <h1>Attendance - {staff.name}</h1>
      <p>
        <strong>ID:</strong> {staff.id} | <strong>Role:</strong> {staff.role}
      </p>

      <div className="attendance-action">
        <label>
          Select Action:{" "}
          <select value={action} onChange={handleActionChange}>
            <option value="">--Select--</option>
            <option value="Mark Attendance">Mark Attendance</option>
            <option value="Leave">Leave</option>
          </select>
        </label>
      </div>

      {/* MARK ATTENDANCE TABLE */}
      {action === "Mark Attendance" && (
        <form className="attendance-form" onSubmit={handleSubmitAttendance}>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Leave Type</th>
                <th>Leave Date</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>
                    <select
                      value={s.status}
                      onChange={(e) => handleAttendanceChange(s.id, e.target.value)}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </td>
                  {s.status === "Leave" ? (
                    <>
                      <td>
                        <select
                          value={s.leaveType}
                          onChange={(e) => handleAttendanceLeaveChange(s.id, "leaveType", e.target.value)}
                          required
                        >
                          <option value="">--Select--</option>
                          <option value="Sick Leave">Sick Leave</option>
                          <option value="Paid Leave">Paid Leave</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          value={s.leaveDate}
                          onChange={(e) => handleAttendanceLeaveChange(s.id, "leaveDate", e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={s.remarks}
                          onChange={(e) => handleAttendanceLeaveChange(s.id, "remarks", e.target.value)}
                          placeholder="Remarks"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="btn submit-btn">
            Submit Attendance
          </button>
        </form>
      )}

      {/* LEAVE FORM */}
      {action === "Leave" && (
        <form className="leave-form" onSubmit={handleLeaveSubmit}>
          <label>
            Leave Type:{" "}
            <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required>
              <option value="">--Select Leave--</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Paid Leave">Paid Leave</option>
            </select>
          </label>

          <label>
            Date:{" "}
            <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} required />
          </label>

          <label>
            Remarks:{" "}
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" />
          </label>

          <button type="submit" className="btn leave-btn">
            Submit Leave
          </button>
        </form>
      )}

      <button className="btn back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
