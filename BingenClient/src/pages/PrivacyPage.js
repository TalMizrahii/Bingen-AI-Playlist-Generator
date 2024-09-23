import React from "react";
import {Navbar} from "../components";
import {Info} from "../containers";

const PrivacyPage = ({username}) => {
    // The sections of the privacy policy.
    const sections = [
        {
            title: "Introduction",
            content: "At Bingen, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information. By using our website, you consent to the practices described in this policy.",
            subPoints: [],
        },
        {
            title: "Information We Collect",
            content: "We may collect the following types of information:",
            subPoints: [
                "Personal Information: We may collect personal information such as your name, email address, and contact information when you voluntarily provide it to us.",
                "Usage Information: We may collect information about how you interact with our website, including your IP address, browser type, and pages viewed.",
            ],
        },
        {
            title: "How We Use Your Information",
            content: "We may use your information for the following purposes:",
            subPoints: [
                "To provide and maintain our website.",
                "To improve and personalize your experience on our website.",
                "To communicate with you, including responding to your inquiries and sending important updates.",
            ],
        },
        {
            title: "Information Sharing",
            content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent. However, we may share your information with trusted service providers who assist us in operating our website or conducting our business.",
            subPoints: [],
        },
        {
            title: "Security Measures",
            content: "We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of data transmission over the internet or electronic storage is completely secure.",
            subPoints: [],
        },
        {
            title: "Your Choices",
            content: "You have the following rights regarding your personal information:",
            subPoints: [
                "Access: You may request access to the personal information we hold about you.",
                "Correction: You may request corrections to your personal information if it is inaccurate or incomplete.",
                "Deletion: You may request the deletion of your personal information under certain circumstances.",
            ],
        },
        {
            title: "Changes to this Privacy Policy",
            content: "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the revised policy on this website.",
            subPoints: [],
        },
        {
            title: "Contact Us",
            content: "If you have any questions or concerns about our Privacy Policy, please contact us at Talmiz404@gmail.com",
            subPoints: [],
        },
    ];

    return (
        <div>
            <div className="gradient__bg">
                <Navbar username={username}/>
            </div>
            <Info error={false} sections={sections} headline={"Privacy Policy"}/>
        </div>
    );
};

export default PrivacyPage;
