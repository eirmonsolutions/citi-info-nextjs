"use client";

import React, { useState } from "react";
import {
    Check,
    UploadCloud,
    Trash2,
    Image,
    Video,
    Plus,
    X,
} from "lucide-react";

const steps = [
    "Basic Info",
    "Contact Info",
    "Hours",
    "Services",
    "Media",
    "Review",
];

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const AddListingPage = () => {
    const [step, setStep] = useState(1);
    const [logoPreview, setLogoPreview] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [services, setServices] = useState([{ name: "", price: "", duration: "" }]);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleLogo = (e) => {
        const file = e.target.files[0];
        if (file) setLogoPreview(URL.createObjectURL(file));
    };

    const handleGallery = (e) => {
        const files = Array.from(e.target.files || []);
        setGallery(files.map((file) => URL.createObjectURL(file)));
    };

    const addService = () => {
        setServices([...services, { name: "", price: "", duration: "" }]);
    };

    const removeService = (index) => {
        setServices(services.filter((_, i) => i !== index));
    };

    return (
        <section className="add-listing-page">
            <div className="wizard-top">
                <div className="container">
                    <div className="progress-list">
                        {steps.map((label, index) => {
                            const number = index + 1;
                            const completed = step > number;
                            const active = step === number;

                            return (
                                <React.Fragment key={label}>
                                    <div className={`progress-box ${active ? "active" : ""} ${completed ? "completed" : ""}`}>
                                        <div className="step-circle">
                                            {completed ? <Check size={18} /> : number}
                                        </div>
                                        <span>{label}</span>
                                    </div>

                                    {number !== steps.length && <div className="step-line" />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="container wizard-body">
                {step === 1 && (
                    <div className="form-step active">
                        <h2>Basic Information</h2>

                        <div className="row">
                            <div className="col-lg-7">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Business Name <span>*</span></label>
                                        <input type="text" placeholder="Enter your business name" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>Category <span>*</span></label>
                                        <select>
                                            <option>Select a category</option>
                                            <option>Beauty Salons & Spas</option>
                                            <option>Restaurants & Takeaway</option>
                                            <option>Car Towing</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label>Country <span>*</span></label>
                                        <select>
                                            <option>Australia</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label>State <span>*</span></label>
                                        <select>
                                            <option>Select your state</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label>City <span>*</span></label>
                                        <select>
                                            <option>Select your city</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <label>Full Address <span>*</span></label>
                                        <textarea rows="3" placeholder="Enter full business address"></textarea>
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <label>Business Description <span>*</span></label>
                                        <textarea rows="5" placeholder="Describe your business, services, and specialties"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label>Business Logo <span>*</span></label>

                                    <label className="upload-logo-box">
                                        <UploadCloud size={28} />
                                        <p>Drop logo here or click</p>
                                        <input type="file" hidden accept="image/*" onChange={handleLogo} />
                                    </label>

                                    {logoPreview && (
                                        <div className="logo-preview">
                                            <img src={logoPreview} alt="Logo" />
                                            <button type="button" onClick={() => setLogoPreview(null)}>
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step active">
                        <h2>Contact Information</h2>

                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>Your Name <span>*</span></label>
                                <input type="text" placeholder="John Doe" />
                            </div>

                            <div className="col-md-4 form-group">
                                <label>Phone <span>*</span></label>
                                <input type="tel" placeholder="(555) 123-4567" />
                            </div>

                            <div className="col-md-4 form-group">
                                <label>Email <span>*</span></label>
                                <input type="email" placeholder="business@example.com" />
                            </div>

                            <div className="col-md-4 form-group">
                                <label>Website</label>
                                <input type="url" placeholder="https://yoursite.com" />
                            </div>

                            <div className="col-md-4 form-group">
                                <label>Alternate Phone</label>
                                <input type="tel" placeholder="(555) 987-6543" />
                            </div>
                        </div>

                        <h2 className="mt-4">Social Media Links</h2>

                        <div className="row">
                            {["Facebook", "Instagram", "Youtube", "Twitter", "LinkedIn", "Snapchat"].map((item) => (
                                <div className="col-md-4 form-group" key={item}>
                                    <label>{item}</label>
                                    <input type="url" placeholder={`https://${item.toLowerCase()}.com/yourbusiness`} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step active">
                        <h2>Add working hours</h2>

                        <div className="working-hours-card">
                            {days.map((day, index) => {
                                const closed = index > 4;

                                return (
                                    <div className={`day-row ${closed ? "is-closed" : ""}`} key={day}>
                                        <div className="day-left">
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={!closed} />
                                                <span></span>
                                            </label>
                                            <strong>{day}</strong>
                                        </div>

                                        {!closed ? (
                                            <div className="time-area">
                                                <input type="time" defaultValue={index < 3 ? "09:00" : "11:00"} />
                                                <span>to</span>
                                                <input type="time" defaultValue={index < 3 ? "17:00" : "16:00"} />

                                                <label className="lunch-toggle">
                                                    <span className="switch small">
                                                        <input type="checkbox" />
                                                        <span></span>
                                                    </span>
                                                    Lunch
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="closed-text">Closed</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="form-step active">
                        <div className="row">
                            <div className="col-lg-8">
                                <h2>Services Offered</h2>

                                {services.map((service, index) => (
                                    <div className="service-card" key={index}>
                                        <div className="service-grid">
                                            <div className="form-group">
                                                <label>Service Name</label>
                                                <input type="text" placeholder="e.g., Haircut" />
                                            </div>

                                            <div className="form-group">
                                                <label>Price</label>
                                                <input type="text" placeholder="e.g., $25" />
                                            </div>

                                            <div className="form-group">
                                                <label>Duration (mins)</label>
                                                <input type="number" />
                                            </div>

                                            <button type="button" className="delete-btn" onClick={() => removeService(index)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button type="button" className="add-service-btn" onClick={addService}>
                                    <Plus size={18} /> Add Service
                                </button>
                            </div>

                            <div className="col-lg-4">
                                <h2>Features</h2>

                                <div className="features-card">
                                    {["Car Parking", "Lift", "Online Payment Card", "Pet Friendly", "Wheel Chair Accessibility", "Wifi"].map((item, index) => (
                                        <button type="button" className={`feature-tile ${index === 0 || index === 4 || index === 5 ? "active" : ""}`} key={item}>
                                            {item}
                                        </button>
                                    ))}

                                    <div className="selected-title">SELECTED (3)</div>

                                    <div className="selected-chips">
                                        <span>Car Parking <X size={14} /></span>
                                        <span>Wheel Chair Accessibility <X size={14} /></span>
                                        <span>Wifi <X size={14} /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="form-step active">
                        <h2>Media</h2>

                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="media-card">
                                    <div className="media-card-head">
                                        <Image size={18} />
                                        <div>
                                            <strong>Business Gallery</strong>
                                            <p>Professional Photos</p>
                                        </div>
                                    </div>

                                    <label className="upload-box">
                                        <UploadCloud size={26} />
                                        <strong>Upload Your Photos</strong>
                                        <p>Drag and drop multiple images or click to browse</p>
                                        <span>Choose Images</span>
                                        <input type="file" hidden multiple accept="image/*" onChange={handleGallery} />
                                    </label>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="media-card">
                                    <div className="media-card-head">
                                        <Video size={18} />
                                        <div>
                                            <strong>YouTube Video</strong>
                                            <p>Promotional Content</p>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Video Link / Embed Code</label>
                                        <input type="text" placeholder="https://youtu.be/xxxx or iframe embed code" />
                                    </div>

                                    <div className="video-preview">
                                        <Video size={34} />
                                        <p>Video preview will appear here</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="media-card">
                                    <strong>Gallery Preview</strong>
                                    <p>{gallery.length} photos ready to showcase</p>

                                    <div className="gallery-preview">
                                        {gallery.map((img, index) => (
                                            <img src={img} alt="" key={index} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="form-step active">
                        <h2>Review</h2>

                        <div className="review-wrap">
                            {[
                                "Basic Information",
                                "Contact Information",
                                "Business Hours",
                                "Services & Pricing",
                                "Features",
                                "Media",
                            ].map((item) => (
                                <div className="review-card" key={item}>
                                    <div className="review-head">
                                        <strong>{item}</strong>
                                        <span>⌃</span>
                                    </div>
                                </div>
                            ))}

                            <div className="terms-box">
                                <label>
                                    <input type="checkbox" /> I agree to the Terms of Service and Privacy Policy. I confirm that all information provided is accurate and up to date.
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <div className="wizard-footer">
                    <button type="button" className="btn-prev" onClick={prevStep} disabled={step === 1}>
                        Previous
                    </button>

                    <span>Step {step} of 6</span>

                    {step < 6 ? (
                        <button type="button" className="next-btn" onClick={nextStep}>
                            Next
                        </button>
                    ) : (
                        <button type="button" className="submit-btn">
                            Submit Listing
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AddListingPage;