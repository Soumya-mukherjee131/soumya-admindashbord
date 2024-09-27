import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
// import moment from 'moment';

const AdminUpdate = () => {
    const { authorizationToken } = useAuth();
    const defaultImageUrl = "https://placehold.co/400";
    const [imageUrl, setImageUrl] = useState(defaultImageUrl); 
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
        designation: "",
        gender: "",
        course: [],
        date: "",
    });
    // const [formData, setFormData] = useState({});
    const params = useParams();

    // Fetch single user data
    const getSingleUserData = async () => {
        try {
            const response = await fetch("api/form/contact/api/admin/users/${params.id}", {
                method: "GET",
                headers: {
                    "Authorization": authorizationToken,
                },
            });

            const fetchedData = await response.json();
            console.log('User data:', fetchedData);

            const fetchedImageUrl = fetchedData.image || defaultImageUrl;

            setData({
                username: fetchedData.username || "",
                email: fetchedData.email || "",
                phone: fetchedData.phone || "",
                designation: fetchedData.designation || "",
                gender: fetchedData.gender || "",
                course: Array.isArray(fetchedData.course) ? fetchedData.course : [],
                date: fetchedData.date || "", 
            });

            // Set the image URL
            setImageUrl(fetchedImageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            course: checked
                ? [...prevData.course, value]
                : prevData.course.filter((course) => course !== value),
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file)); 
            setData({
                ...data,
                image: file, 
            });
        } else {
            setImageUrl(defaultImageUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (data.image) {
            formData.append('image', data.image);
        }

        for (const key in data) {
            if (data.hasOwnProperty(key) && key !== 'image') {
                formData.append(key, data[key]);
            }
        }

        try {
            const uploadResponse = await fetch(`http://localhost:5000/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload image');
            }

            const { imageUrl: uploadedImageUrl } = await uploadResponse.json();
            setImageUrl(uploadedImageUrl);

            const updateResponse = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ ...data, image: uploadedImageUrl }), // Include the uploaded image URL
            });

            console.log('Updated data:', data);
            if (updateResponse.ok) {
                toast.success("Updated successfully");
            } else {
                toast.error("Invalid credentials - failed to update");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update");
        }
    };

    return (
        <>
            <section className="contact-sections">
                <div className="contact-containers">
                    <h1 className="contact-headings">Employee Edit</h1>
                    <form onSubmit={handleSubmit}>
                    <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Your name"
                                required
                                value={data.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email"
                                required
                                value={data.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Your phone number"
                                required
                                value={data.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="designation">Designation</label>
                            <select
                                id="designation"
                                name="designation"
                                value={data.designation}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select designation</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Tester">Tester</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>

                        {/* Gender Radio Buttons */}
                        <div>
                            <label>Gender</label>
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="Male"
                                    checked={data.gender === "Male"}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="Female"
                                    checked={data.gender === "Female"}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>

                        {/* Course Checkboxes */}
                        <div>
                            <label>Courses</label>
                            <div>
                                <input
                                    type="checkbox"
                                    id="course1"
                                    name="course"
                                    value="MCA"
                                    checked={data.course?.includes("MCA")}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="course1">MCA</label>

                                <input
                                    type="checkbox"
                                    id="course2"
                                    name="course"
                                    value="BSC"
                                    checked={data.course?.includes("BSC")}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="course2">BSC</label>

                                <input
                                    type="checkbox"
                                    id="course3"
                                    name="course"
                                    value="BCA"
                                    checked={data.course?.includes("BCA")}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="course3">BCA</label>
                            </div>
                        </div>

                        {/* Date Field */}
                        <div>
                            <label htmlFor="date">Profile Created Date</label>
                            <input
                                    type="text"
                                    id="date"
                                    name="date"
                                    placeholder="15-Aug-47"
                                    value={data.date} 
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        <div>
                            <label htmlFor="image">Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        {/* Image Preview */}
                        <div>
                            <img
                                src={imageUrl} // Use the imageUrl state for the preview
                                alt="User"
                                style={{ width: '100px', height: '100px', marginTop: '10px' }} // Style it as needed
                            />
                        </div>

                        <button type="submit" className="btn btn-submit">
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AdminUpdate;
