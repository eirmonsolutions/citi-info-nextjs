"use client";

import React from "react";
import { Tag } from "lucide-react";
import Link from "next/link";

const BusinessAnnouncementSection = ({ listing }) => {
    const announcement = listing?.announcements?.[0];

    if (!announcement) return null;

    return (
        <>
            <div className="ann-card ann-preview">
                <div className="ann-card-head">
                    Latest Announcements
                </div>

                <div className="ann-card-body">
                    <div className="ann-preview-icon">
                        <Tag size={20} />
                    </div>

                    <div className="ann-preview-texts">
                        <div className="ann-preview-title">
                            {announcement.title}
                        </div>

                        <div className="ann-preview-desc">
                            {announcement.description}
                        </div>
                    </div>

                    {announcement.link && (
                        <Link
                            href={announcement.link}
                            target="_blank"
                            className="ann-chip"
                        >
                            Announcement
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default BusinessAnnouncementSection;