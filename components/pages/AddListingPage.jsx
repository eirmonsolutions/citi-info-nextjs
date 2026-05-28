"use client";

import React, { useEffect, useState } from "react";
import {
    Check,
    UploadCloud,
    Trash2,
    Image,
    Video,
    Plus,
    X,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

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

const dayKeys = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

const CustomSelect = ({
    id,
    label,
    required,
    placeholder,
    options = [],
    openSelect,
    setOpenSelect,
    disabled = false,
    value,
    onSelect,
}) => {
    const [search, setSearch] = useState("");

    const isOpen = openSelect === id;

    const selectedItem = options.find((item) => String(item.id) === String(value));

    const filteredOptions = options.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="form-group">
            <label>
                {label} {required && <span>*</span>}
            </label>

            <div
                className={`custom-select ${isOpen ? "is-open" : ""} ${disabled ? "is-disabled" : ""
                    }`}
            >
                <button
                    type="button"
                    className="select-trigger"
                    disabled={disabled}
                    onClick={() => {
                        if (disabled) return;
                        setOpenSelect(isOpen ? null : id);
                    }}
                >
                    <span className={!selectedItem ? "select-placeholder" : ""}>
                        {selectedItem?.name || placeholder}
                    </span>

                    <span className="select-icon">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </span>
                </button>

                {isOpen && (
                    <div className="select-panel">
                        <div className="select-search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <ul className="select-options">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((item) => (
                                    <li
                                        key={item.id}
                                        className="select-option"
                                        onClick={() => {
                                            setOpenSelect(null);
                                            setSearch("");
                                            onSelect?.(item);
                                        }}
                                    >
                                        {item.name}
                                    </li>
                                ))
                            ) : (
                                <li className="select-option disabled">
                                    No result found
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

const AddListingPage = () => {
    const [step, setStep] = useState(1);
    const [openSelect, setOpenSelect] = useState(null);
    const [openReview, setOpenReview] = useState("basic");

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [featuresList, setFeaturesList] = useState([]);

    const [logoFile, setLogoFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        business_name: "",
        category_id: "",
        category: "",
        country: "",
        state: "",
        city: "",
        address: "",
        description: "",
        listing_type: "free",

        contact_name: "",
        phone: "",
        email: "",
        alternate_phone: "",
        website: "",

        facebook: "",
        instagram: "",
        youtube: "",
        twitter: "",
        linkedin: "",
        snapchat: "",

        video_link_url: "",
        agree_terms: false,
    });

    const [hours, setHours] = useState({
        monday: {
            enabled: true,
            start: "09:00",
            end: "17:00",
            lunch: true,
            lunch_start: "13:00",
            lunch_end: "14:00",
        },
        tuesday: {
            enabled: true,
            start: "09:00",
            end: "17:00",
            lunch: true,
            lunch_start: "13:00",
            lunch_end: "14:00",
        },
        wednesday: {
            enabled: true,
            start: "09:00",
            end: "17:00",
            lunch: true,
            lunch_start: "13:00",
            lunch_end: "14:00",
        },
        thursday: {
            enabled: true,
            start: "11:00",
            end: "16:00",
            lunch: true,
            lunch_start: "13:30",
            lunch_end: "14:00",
        },
        friday: {
            enabled: true,
            start: "11:00",
            end: "16:00",
            lunch: false,
            lunch_start: "",
            lunch_end: "",
        },
        saturday: {
            enabled: false,
            start: "",
            end: "",
            lunch: false,
            lunch_start: "",
            lunch_end: "",
        },
        sunday: {
            enabled: false,
            start: "",
            end: "",
            lunch: false,
            lunch_start: "",
            lunch_end: "",
        },
    });

    const [services, setServices] = useState([
        {
            name: "",
            description: "",
            price: "",
            currency: "AUD",
            duration: "",
            popular: false,
        },
    ]);

    const [selectedFeatures, setSelectedFeatures] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (formData.country) {
            fetchStates(formData.country);
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.state) {
            fetchCities(formData.state);
        }
    }, [formData.state]);

    const fetchInitialData = async () => {
        try {
            const [catRes, countryRes, featureRes] = await Promise.all([
                fetch(`${API_URL}/form-categories`),
                fetch(`${API_URL}/form-countries`),
                fetch(`${API_URL}/form-features`),
            ]);

            const catData = await catRes.json();
            const countryData = await countryRes.json();
            const featureData = await featureRes.json();

            setCategories(catData.data || catData || []);
            setCountries(countryData.data || countryData || []);
            setFeaturesList(featureData.data || featureData || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStates = async (countryId) => {
        try {
            const res = await fetch(`${API_URL}/form-states?country_id=${countryId}`);
            const data = await res.json();
            setStates(data.data || data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCities = async (stateId) => {
        try {
            const res = await fetch(`${API_URL}/form-cities?state_id=${stateId}`);
            const data = await res.json();
            setCities(data.data || data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const updateHour = (day, key, value) => {
        setHours((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [key]: value,
            },
        }));
    };

    const addService = () => {
        setServices((prev) => [
            ...prev,
            {
                name: "",
                description: "",
                price: "",
                currency: "AUD",
                duration: "",
                popular: false,
            },
        ]);
    };

    const removeService = (index) => {
        setServices((prev) => prev.filter((_, i) => i !== index));
    };

    const updateService = (index, key, value) => {
        setServices((prev) =>
            prev.map((service, i) =>
                i === index ? { ...service, [key]: value } : service
            )
        );
    };

    const toggleFeature = (feature) => {
        setSelectedFeatures((prev) => {
            const exists = prev.some((item) => item.id === feature.id);

            if (exists) {
                return prev.filter((item) => item.id !== feature.id);
            }

            return [...prev, feature];
        });
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            data.append("category_id", formData.category_id);
            data.append("country_id", formData.country);
            data.append("state_id", formData.state);
            data.append("city_id", formData.city);

            Object.entries(hours).forEach(([day, value]) => {
                data.append(`hours[${day}][start]`, value.enabled ? value.start : "");
                data.append(`hours[${day}][end]`, value.enabled ? value.end : "");
                data.append(
                    `hours[${day}][lunch_start]`,
                    value.enabled && value.lunch ? value.lunch_start : ""
                );
                data.append(
                    `hours[${day}][lunch_end]`,
                    value.enabled && value.lunch ? value.lunch_end : ""
                );
            });

            services.forEach((service, index) => {
                data.append(`services[${index}][name]`, service.name);
                data.append(`services[${index}][description]`, service.description);
                data.append(`services[${index}][price]`, service.price);
                data.append(`services[${index}][currency]`, service.currency);
                data.append(`services[${index}][duration]`, service.duration);
                data.append(`services[${index}][popular]`, service.popular ? 1 : 0);
            });

            data.append(
                "features",
                selectedFeatures.map((item) => item.name).join(",")
            );

            data.append(
                "feature_id",
                selectedFeatures.map((item) => item.id).join(",")
            );

            data.append(
                "feature_images",
                selectedFeatures
                    .map((item) => item.image || item.icon || item.feature_image || "")
                    .join(",")
            );

            if (logoFile) {
                data.append("business_logo", logoFile);
            }

            galleryFiles.forEach((file) => {
                data.append("business_gallery[]", file);
            });

            const res = await fetch(`${API_URL}/submit-listing`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: data,
            });

            const result = await res.json();

            if (!res.ok) {
                console.log(result);
                setMessage(result.message || "Please check required fields.");
                return;
            }

            setMessage("Listing submitted successfully. Waiting for approval.");
            setStep(1);

            setFormData({
                business_name: "",
                category_id: "",
                category: "",
                country: "",
                state: "",
                city: "",
                address: "",
                description: "",
                listing_type: "free",
                contact_name: "",
                phone: "",
                email: "",
                alternate_phone: "",
                website: "",
                facebook: "",
                instagram: "",
                youtube: "",
                twitter: "",
                linkedin: "",
                snapchat: "",
                video_link_url: "",
                agree_terms: false,
            });

            setLogoFile(null);
            setGalleryFiles([]);
            setSelectedFeatures([]);
            setServices([
                {
                    name: "",
                    description: "",
                    price: "",
                    currency: "AUD",
                    duration: "",
                    popular: false,
                },
            ]);
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
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
                                    <div
                                        className={`progress-box ${active ? "active" : ""} ${completed ? "completed" : ""
                                            }`}
                                    >
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

            <form onSubmit={handleSubmit}>
                <div className="container wizard-body">
                    {message && (
                        <div className="alert alert-info mb-3">
                            {message}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="form-step active">
                            <h2>Basic Information</h2>

                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="form-grid">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Business Name <span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="business_name"
                                                    value={formData.business_name}
                                                    onChange={handleInput}
                                                    placeholder="Enter your business name"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <CustomSelect
                                                    id="category"
                                                    label="Category"
                                                    required
                                                    placeholder="Select a category"
                                                    options={categories}
                                                    value={formData.category_id}
                                                    openSelect={openSelect}
                                                    setOpenSelect={setOpenSelect}
                                                    onSelect={(item) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            category_id: item.id,
                                                            category: item.name,
                                                        }));
                                                    }}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <CustomSelect
                                                    id="country"
                                                    label="Country"
                                                    required
                                                    placeholder="Select country"
                                                    options={countries}
                                                    value={formData.country}
                                                    openSelect={openSelect}
                                                    setOpenSelect={setOpenSelect}
                                                    onSelect={(item) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            country: item.id,
                                                            state: "",
                                                            city: "",
                                                        }));
                                                        setStates([]);
                                                        setCities([]);
                                                    }}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <CustomSelect
                                                    id="state"
                                                    label="State"
                                                    required
                                                    placeholder="Select your state"
                                                    options={states}
                                                    value={formData.state}
                                                    openSelect={openSelect}
                                                    setOpenSelect={setOpenSelect}
                                                    disabled={!formData.country}
                                                    onSelect={(item) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            state: item.id,
                                                            city: "",
                                                        }));
                                                        setCities([]);
                                                    }}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <CustomSelect
                                                    id="city"
                                                    label="Suburb"
                                                    required
                                                    placeholder="Select your suburb"
                                                    options={cities}
                                                    value={formData.city}
                                                    openSelect={openSelect}
                                                    setOpenSelect={setOpenSelect}
                                                    disabled={!formData.state}
                                                    onSelect={(item) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            city: item.id,
                                                        }));
                                                    }}
                                                />
                                            </div>

                                            <div className="col-md-12 form-group">
                                                <label>
                                                    Full Address <span>*</span>
                                                </label>
                                                <textarea
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInput}
                                                    rows="3"
                                                    placeholder="Enter full business address"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-12 form-group">
                                                <label>
                                                    Business Description <span>*</span>
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInput}
                                                    rows="5"
                                                    placeholder="Describe your business, services, and specialties"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="form-group">
                                        <label>
                                            Business Logo <span>*</span>
                                        </label>

                                        <label className="upload-logo-box">
                                            <UploadCloud size={28} />

                                            <p>
                                                {logoFile ? "Change Logo" : "Drop logo here or click"}
                                            </p>

                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setLogoFile(e.target.files?.[0] || null)
                                                }
                                            />
                                        </label>

                                        {logoFile && (
                                            <div className="logo-preview-area">
                                                <div className="logo-preview-box">
                                                    <img
                                                        src={URL.createObjectURL(logoFile)}
                                                        alt="Logo Preview"
                                                        className="logo-preview-img"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    className="logo-remove-btn"
                                                    onClick={() => setLogoFile(null)}
                                                >
                                                    <Trash2 size={18} />
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

                            <div className="form-grid">
                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <label>
                                            Your Name <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="contact_name"
                                            value={formData.contact_name}
                                            onChange={handleInput}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label>
                                            Phone <span>*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInput}
                                            placeholder="0412 345 678"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label>
                                            Email <span>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInput}
                                            placeholder="business@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label>Website</label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInput}
                                            placeholder="https://yoursite.com"
                                        />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label>Alternate Phone</label>
                                        <input
                                            type="tel"
                                            name="alternate_phone"
                                            value={formData.alternate_phone}
                                            onChange={handleInput}
                                            placeholder="0412 987 654"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="mt-4">Social Media Links</h2>

                            <div className="form-grid">
                                <div className="row">
                                    {[
                                        {
                                            name: "facebook",
                                            label: "Facebook",
                                            color: "#1877f2",
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#1877f2"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                                </svg>
                                            ),
                                        },

                                        {
                                            name: "instagram",
                                            label: "Instagram",
                                            color: "#e4405f",
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#e4405f"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                                </svg>
                                            ),
                                        },

                                        {
                                            name: "youtube",
                                            label: "Youtube",
                                            color: "#ff0000",
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#ff0000"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                                    <path d="m10 15 5-3-5-3z" />
                                                </svg>
                                            ),
                                        },

                                        {
                                            name: "twitter",
                                            label: "Twitter",
                                            color: "#1da1f2",
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#1da1f2"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                                </svg>
                                            ),
                                        },

                                        {
                                            name: "linkedin",
                                            label: "LinkedIn",
                                            color: "#0077b5",
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#0077b5"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                    <rect width="4" height="12" x="2" y="9" />
                                                    <circle cx="4" cy="4" r="2" />
                                                </svg>
                                            ),
                                        },

                                        {
                                            name: "snapchat",
                                            label: "Snapchat",
                                            color: "#fffc00",
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#facc15"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 2c-3.4 0-6 2.6-6 6v2.3c0 .6-.3 1.1-.8 1.4-.6.4-1.3.7-2 .9-.7.2-1.2.7-1.2 1.3 0 .7.7 1.2 1.7 1.6 1.3.5 2.2 1.2 2.8 2.1.4.6 1 .9 1.7.9h1.1c.4 0 .7.2 1 .5.5.5 1.1.8 1.7.8s1.2-.3 1.7-.8c.3-.3.6-.5 1-.5h1.1c.7 0 1.3-.3 1.7-.9.6-.9 1.5-1.6 2.8-2.1 1-.4 1.7-.9 1.7-1.6 0-.6-.5-1.1-1.2-1.3-.7-.2-1.4-.5-2-.9-.5-.3-.8-.8-.8-1.4V8c0-3.4-2.6-6-6-6z" />
                                                </svg>
                                            ),
                                        },
                                    ].map((item) => (
                                        <div className="col-md-4 " key={item.name}>
                                            <div className="form-group">
                                                <label><span className="social-icon">
                                                    {item.icon}
                                                </span>
                                                    {item.label}</label>

                                                <div className="social-input-wrap">


                                                    <input
                                                        type="url"
                                                        name={item.name}
                                                        value={formData[item.name]}
                                                        onChange={handleInput}
                                                        placeholder={`https://${item.name}.com/yourbusiness`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-step active">
                            <h2>Add working hours</h2>

                            <div className="working-hours-card">
                                {dayKeys.map((dayKey, index) => {
                                    const dayLabel = days[index];
                                    const day = hours[dayKey];

                                    return (
                                        <div
                                            className={`day-row ${!day.enabled ? "is-closed" : ""
                                                }`}
                                            key={dayKey}
                                        >
                                            <div className="day-left">
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={day.enabled}
                                                        onChange={(e) =>
                                                            updateHour(
                                                                dayKey,
                                                                "enabled",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <span></span>
                                                </label>
                                                <strong>{dayLabel}</strong>
                                            </div>

                                            {day.enabled ? (
                                                <div className="time-area">
                                                    <input
                                                        type="time"
                                                        value={day.start}
                                                        onChange={(e) =>
                                                            updateHour(
                                                                dayKey,
                                                                "start",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <span>to</span>

                                                    <input
                                                        type="time"
                                                        value={day.end}
                                                        onChange={(e) =>
                                                            updateHour(
                                                                dayKey,
                                                                "end",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <label className="lunch-toggle">
                                                        <span className="switch small">
                                                            <input
                                                                type="checkbox"
                                                                checked={day.lunch}
                                                                onChange={(e) =>
                                                                    updateHour(
                                                                        dayKey,
                                                                        "lunch",
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />
                                                            <span></span>
                                                        </span>
                                                        Lunch
                                                    </label>

                                                    {day.lunch && (
                                                        <>
                                                            <input
                                                                type="time"
                                                                value={day.lunch_start}
                                                                onChange={(e) =>
                                                                    updateHour(
                                                                        dayKey,
                                                                        "lunch_start",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="lunch-time-input"
                                                            />

                                                            <span>to</span>

                                                            <input
                                                                type="time"
                                                                value={day.lunch_end}
                                                                onChange={(e) =>
                                                                    updateHour(
                                                                        dayKey,
                                                                        "lunch_end",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="lunch-time-input"
                                                            />
                                                        </>
                                                    )}
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
                                                    <input
                                                        type="text"
                                                        value={service.name}
                                                        onChange={(e) =>
                                                            updateService(index, "name", e.target.value)
                                                        }
                                                        placeholder="e.g., Haircut"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Price</label>
                                                    <input
                                                        type="text"
                                                        value={service.price}
                                                        onChange={(e) =>
                                                            updateService(index, "price", e.target.value)
                                                        }
                                                        placeholder="25"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Duration</label>
                                                    <input
                                                        type="number"
                                                        value={service.duration}
                                                        onChange={(e) =>
                                                            updateService(index, "duration", e.target.value)
                                                        }
                                                        placeholder="30"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    onClick={() => removeService(index)}
                                                    disabled={services.length === 1}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="add-service-btn"
                                        onClick={addService}
                                    >
                                        <Plus size={18} /> Add Service
                                    </button>
                                </div>

                                <div className="col-lg-4">
                                    <h2>Features</h2>

                                    <div className="features-card">
                                        <div className="features-grid">
                                            {featuresList.map((item) => {

                                                const active = selectedFeatures.some(
                                                    (f) => f.id === item.id
                                                );

                                                const rawImg =
                                                    item.icon_image ||
                                                    item.image ||
                                                    item.icon ||
                                                    item.feature_image ||
                                                    "";

                                                const img = rawImg
                                                    ? rawImg.startsWith("http")
                                                        ? rawImg
                                                        : `http://127.0.0.1:8000/storage/${rawImg}`
                                                    : "";

                                                return (
                                                    <button
                                                        type="button"
                                                        key={item.id}
                                                        className={`feature-tile ${active ? "active" : ""}`}
                                                        onClick={() => toggleFeature(item)}
                                                    >
                                                        {img && (
                                                            <span className="ft-icon">
                                                                <img src={img} alt={item.name} />
                                                            </span>
                                                        )}

                                                        <span className="ft-text">{item.name}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="features-divider"></div>

                                        <div className="selected-head">
                                            <div className="selected-title">
                                                SELECTED ({selectedFeatures.length})
                                            </div>
                                        </div>

                                        <div className="selected-chips">
                                            {selectedFeatures.map((item) => {

                                                const rawImg =
                                                    item.icon_image ||
                                                    item.image ||
                                                    item.icon ||
                                                    item.feature_image ||
                                                    "";

                                                const img = rawImg
                                                    ? rawImg.startsWith("http")
                                                        ? rawImg
                                                        : `http://127.0.0.1:8000/storage/${rawImg}`
                                                    : "";

                                                return (
                                                    <span className="feature-chip" key={item.id}>

                                                        {img && (
                                                            <span className="chip-icon">
                                                                <img
                                                                    src={img}
                                                                    alt={item.name}
                                                                    onError={(e) => {
                                                                        e.target.style.display = "none";
                                                                    }}
                                                                />
                                                            </span>
                                                        )}

                                                        <span className="chip-text">
                                                            {item.name}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => toggleFeature(item)}
                                                            className="chip-remove"
                                                        >
                                                            <X size={16} />
                                                        </button>

                                                    </span>
                                                );
                                            })}
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
                                            <div className="media-icon">
                                                <Image size={18} />
                                            </div>

                                            <div>
                                                <div className="media-title">Business Gallery</div>
                                                <div className="media-subtitle">Professional Photos</div>
                                            </div>
                                        </div>

                                        <label className="upload-box">
                                            <div className="upload-inner">
                                                <div className="upload-circle">
                                                    <UploadCloud size={20} />
                                                </div>

                                                <div className="upload-title">Upload Your Photos</div>
                                                <div className="upload-hint">
                                                    Drag and drop multiple images or click to browse
                                                </div>
                                                <div className="upload-meta">
                                                    PNG, JPG, WEBP up to 4MB each
                                                </div>

                                                <div className="upload-btn">Choose Images</div>
                                            </div>

                                            <input
                                                name="business_gallery[]"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                hidden
                                                onChange={(e) =>
                                                    setGalleryFiles(Array.from(e.target.files || []))
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="media-card">
                                        <div className="media-card-head">
                                            <div className="media-icon">
                                                <Video size={18} />
                                            </div>

                                            <div>
                                                <div className="media-title">YouTube Video</div>
                                                <div className="media-subtitle">
                                                    Promotional Content
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-label">
                                                Video Link / Embed Code
                                            </label>
                                            <input
                                                className="form-control media-input"
                                                type="text"
                                                name="video_link_url"
                                                value={formData.video_link_url}
                                                onChange={handleInput}
                                                placeholder="https://youtu.be/xxxx"
                                            />
                                        </div>

                                        <div className="video-preview-wrap">
                                            <div className="video-preview-title">
                                                VIDEO PREVIEW
                                            </div>

                                            <div className="video-preview">
                                                <div className="video-preview-icon">
                                                    <Video size={26} />
                                                </div>
                                                <div className="video-preview-text">
                                                    Video preview will appear here
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {galleryFiles.length > 0 && (
                                    <div className="col-12">
                                        <div className="media-card">
                                            <div className="gallery-head">
                                                <div>
                                                    <div className="media-title">
                                                        Gallery Preview
                                                    </div>
                                                    <div className="media-subtitle">
                                                        {galleryFiles.length} photos ready to showcase
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="gallery-strip thumb-row">
                                                {galleryFiles.map((file, index) => (
                                                    <div className="gallery-item" key={index}>
                                                        <img
                                                            className="gallery-thumb"
                                                            src={URL.createObjectURL(file)}
                                                            alt={file.name}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="gallery-remove-btn"
                                                            onClick={() =>
                                                                setGalleryFiles((prev) =>
                                                                    prev.filter((_, i) => i !== index)
                                                                )
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="form-step active">
                            <h2>Review</h2>

                            <div className="review-wrap">

                                {/* BASIC */}
                                <div className="review-card theme-basic">
                                    <div
                                        className={`review-head ${openReview === "basic" ? "" : "collapsed"}`}
                                        onClick={() => setOpenReview(openReview === "basic" ? "" : "basic")}
                                    >
                                        <div className="review-title"><span>Basic Information</span></div>
                                        <div className="review-actions">
                                            <span class="chev">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {openReview === "basic" && (
                                        <div className="review-body">
                                            <div className="review-grid">
                                                <div className="review-item">
                                                    <div className="lbl">Business Name</div>
                                                    <div className="val">{formData.business_name || "—"}</div>
                                                </div>

                                                <div className="review-item">
                                                    <div className="lbl">Business Logo</div>
                                                    <div className="val">
                                                        {logoFile ? (
                                                            <img
                                                                src={URL.createObjectURL(logoFile)}
                                                                alt="Business Logo"
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    objectFit: "contain",
                                                                }}
                                                            />
                                                        ) : (
                                                            "No logo uploaded"
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="review-item">
                                                    <div className="lbl">Category</div>
                                                    <div className="val">{formData.category || "—"}</div>
                                                </div>

                                                <div className="review-item">
                                                    <div className="lbl">Country</div>
                                                    <div className="val">
                                                        {countries.find((i) => String(i.id) === String(formData.country))?.name || "—"}
                                                    </div>
                                                </div>

                                                <div className="review-item">
                                                    <div className="lbl">State</div>
                                                    <div className="val">
                                                        {states.find((i) => String(i.id) === String(formData.state))?.name || "—"}
                                                    </div>
                                                </div>

                                                <div className="review-item">
                                                    <div className="lbl">City</div>
                                                    <div className="val">
                                                        {cities.find((i) => String(i.id) === String(formData.city))?.name || "—"}
                                                    </div>
                                                </div>

                                                <div className="review-item full">
                                                    <div className="lbl">Address</div>
                                                    <div className="val">{formData.address || "—"}</div>
                                                </div>

                                                <div className="review-item full">
                                                    <div className="lbl">Description</div>
                                                    <div className="val">{formData.description || "—"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* CONTACT */}
                                <div className="review-card theme-contact">
                                    <div
                                        className={`review-head ${openReview === "contact" ? "" : "collapsed"}`}
                                        onClick={() => setOpenReview(openReview === "contact" ? "" : "contact")}
                                    >
                                        <div className="review-title"><span>Contact Information</span></div>
                                        <div className="review-actions">
                                            <span class="chev">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {openReview === "contact" && (
                                        <div className="review-body">
                                            <div className="review-grid">
                                                <div className="review-item">
                                                    <div className="lbl">Name</div>
                                                    <div className="val">{formData.contact_name || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Phone</div>
                                                    <div className="val">{formData.phone || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Email</div>
                                                    <div className="val">{formData.email || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Alternate Phone</div>
                                                    <div className="val">{formData.alternate_phone || "—"}</div>
                                                </div>
                                                <div className="review-item full">
                                                    <div className="lbl">Website</div>
                                                    <div className="val">{formData.website || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Facebook</div>
                                                    <div className="val">{formData.facebook || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Instagram</div>
                                                    <div className="val">{formData.instagram || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Youtube</div>
                                                    <div className="val">{formData.youtube || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Twitter</div>
                                                    <div className="val">{formData.twitter || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">LinkedIn</div>
                                                    <div className="val">{formData.linkedin || "—"}</div>
                                                </div>
                                                <div className="review-item">
                                                    <div className="lbl">Snapchat</div>
                                                    <div className="val">{formData.snapchat || "—"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* HOURS */}
                                <div className="review-card theme-hours">
                                    <div
                                        className={`review-head ${openReview === "hours" ? "" : "collapsed"}`}
                                        onClick={() => setOpenReview(openReview === "hours" ? "" : "hours")}
                                    >
                                        <div className="review-title"><span>Business Hours</span></div>
                                        <div className="review-actions">
                                            <span class="chev">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {openReview === "hours" && (
                                        <div className="review-body">
                                            <div className="review-grid">
                                                {dayKeys.map((dayKey, index) => (
                                                    <div className="review-item" key={dayKey}>
                                                        <div className="lbl">{days[index]}</div>
                                                        <div className="val">
                                                            {hours[dayKey].enabled
                                                                ? `${hours[dayKey].start} - ${hours[dayKey].end}`
                                                                : "Closed"}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* SERVICES */}
                                <div className="review-card theme-services">
                                    <div
                                        className={`review-head ${openReview === "services" ? "" : "collapsed"}`}
                                        onClick={() => setOpenReview(openReview === "services" ? "" : "services")}
                                    >
                                        <div className="review-title"><span>Services & Pricing</span></div>
                                        <div className="review-actions">
                                            <span class="chev">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {openReview === "services" && (
                                        <div className="review-body">
                                            {services.filter((s) => s.name).length > 0 ? (
                                                <div className="review-grid">
                                                    {services.filter((s) => s.name).map((service, index) => (
                                                        <div className="review-item full" key={index}>
                                                            <div className="lbl">{service.name}</div>
                                                            <div className="val">
                                                                {service.price
                                                                    ? `$${service.price}`
                                                                    : "Price not added"}

                                                                {service.duration && (
                                                                    <> | {service.duration} mins</>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="muted-sm">No services added.</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* FEATURES */}
                                <div className="review-card theme-features">
                                    <div
                                        className={`review-head ${openReview === "features" ? "" : "collapsed"}`}
                                        onClick={() => setOpenReview(openReview === "features" ? "" : "features")}
                                    >
                                        <div className="review-title"><span>Features</span></div>
                                        <div className="review-actions">
                                            <span class="chev">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {openReview === "features" && (
                                        <div className="review-body">
                                            <div className="selected-chips">
                                                {selectedFeatures.length > 0 ? (
                                                    selectedFeatures.map((item) => {
                                                        const rawImg = item.icon_image || item.image || item.icon || item.feature_image || "";
                                                        const img = rawImg
                                                            ? rawImg.startsWith("http")
                                                                ? rawImg
                                                                : `https://citiinfo.com.au/storage/${rawImg}`
                                                            : "";

                                                        return (
                                                            <span className="feature-chip" key={item.id}>
                                                                {img && (
                                                                    <span className="chip-icon">
                                                                        <img src={img} alt={item.name} />
                                                                    </span>
                                                                )}
                                                                {item.name}
                                                            </span>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="muted-sm">No features selected.</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* MEDIA */}
                                <div className="review-card theme-media">
                                    <div
                                        className={`review-head ${openReview === "media" ? "" : "collapsed"}`}
                                        onClick={() => setOpenReview(openReview === "media" ? "" : "media")}
                                    >
                                        <div className="review-title"><span>Media</span></div>
                                        <div className="review-actions">
                                            <span class="chev">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {openReview === "media" && (
                                        <div className="review-body">
                                            <div className="review-grid">
                                                <div className="review-item full">
                                                    <div className="lbl">Gallery Images</div>
                                                    <div className="val">{galleryFiles.length} image(s) uploaded</div>
                                                </div>

                                                <div className="review-item full">
                                                    <div className="lbl">Video Link</div>
                                                    <div className="val">{formData.video_link_url || "—"}</div>
                                                </div>
                                            </div>

                                            {galleryFiles.length > 0 && (
                                                <div className="gallery-strip thumb-row mt-3">
                                                    {galleryFiles.map((file, index) => (
                                                        <div className="gallery-item" key={index}>
                                                            <img
                                                                className="gallery-thumb"
                                                                src={URL.createObjectURL(file)}
                                                                alt={file.name}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="terms-box mt-3">
                                    <label className="d-flex align-items-start gap-2 m-0">
                                        <input
                                            type="checkbox"
                                            name="agree_terms"
                                            checked={formData.agree_terms}
                                            onChange={handleInput}
                                            className="mt-1"
                                            required
                                        />
                                        <span className="terms-text">
                                            I agree to the <a href="#">Terms of Service</a> and{" "}
                                            <a href="#">Privacy Policy</a>. I confirm that all information provided is accurate and up to date.
                                        </span>
                                    </label>
                                </div>

                            </div>
                        </div>
                    )}

                    <div className="wizard-footer">
                        <button
                            type="button"
                            className="btn-prev"
                            onClick={prevStep}
                            disabled={step === 1 || loading}
                        >
                            Previous
                        </button>

                        <span>Step {step} of 6</span>

                        {step < 6 ? (
                            <button
                                type="button"
                                className="next-btn"
                                onClick={nextStep}
                                disabled={loading}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Listing"}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </section>
    );
};

export default AddListingPage;