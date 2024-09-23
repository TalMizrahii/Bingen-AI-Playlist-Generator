import React from "react";
import {Navbar} from "../components";
import {bingenAddress} from "../Strings"
import Info from "../containers/info/Info"

const TermsPage = ({username}) => {
    // The sections of the terms and conditions page.
    const sections = [
        {
            title: "Introduction",
            content: `These Terms and Conditions ("Terms") govern your use of the Bingen website ("Website").
             By accessing or using our Website, you agree to comply with and be bound by these Terms.
              If you do not agree to these Terms, please do not use our Website.`,
        },
        {
            title: "Changes to Terms",
            content: `We reserve the right to modify, amend, or replace these Terms at any time.
             The most current version of these Terms will be posted on the Website.
             Your continued use of the Website following any changes constitutes acceptance of those changes.`,
        },
        {
            title: "Privacy",
            content: "Your use of the Website is also governed by our Privacy Policy, which can be found at " + bingenAddress + "/privacy" + ". By using the Website, you consent to the practices described in the Privacy Policy.",
        },
        {
            title: "User Registration",
            content: "Some features or services provided by the Website may require you to register for an account. You agree to provide accurate," +
                " current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
        },
        {
            title: "User Content",
            subPoints: [
                "You may have the opportunity to submit, post, or upload content to the Website, including but not limited to reviews, comments, and other materials (\"User Content\"). By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free, irrevocable, sublicensable license to use, reproduce, adapt, publish, translate, distribute, and display such User Content on the Website and for any other purpose we see fit.",
                "You represent and warrant that you have the right to submit User Content and that your User Content does not infringe upon the intellectual property rights, privacy rights, or any other legal rights of any third party.",
            ],
        },
        {
            title: "Prohibited Conduct",
            content: "When using the Website, you agree not to:",
            subPoints: [
                "Violate any applicable laws, regulations, or third-party rights.",
                "Use the Website for any unlawful, fraudulent, or malicious purposes.",
                "Transmit or post any content that is harmful, offensive, or infringing on the rights of others.",
                "Attempt to gain unauthorized access to any part of the Website or any other systems or networks connected to the Website.",
                "Use automated scripts or bots to access or interact with the Website.",
                "Impersonate another person or entity or misrepresent your affiliation with any person or entity.",
            ],
        },
        {
            title: "Termination",
            content: "We reserve the right to terminate or suspend your access to the Website without notice, for any reason, including but not limited to a breach of these Terms.",
        },
        {
            title: "Disclaimer of Warranties\n",
            subPoints: [
                "The Website is provided \"as is\" and \"as available\" without any warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
                "We do not warrant that the Website will be error-free, uninterrupted, secure, or free from viruses or other harmful components.",
            ],
        },
        {
            title: "Limitation of Liability",
            content: "In no event shall the Company, its officers, directors, employees, or agents be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of the Website.",
        },
        {
            title: "Governing Law",
            content: "These Terms shall be governed by and construed in accordance with the laws of Israel, without regard to its conflict of law principles.",
        },
        {
            title: "Contact Information",
            content: "If you have any questions about these Terms or need to contact us for any reason, please use the following contact information:\n Talmiz404@gmail.com",
        },
    ];

    return (
        <div>
            <div className="gradient__bg">
                <Navbar username={username}/>
            </div>
            <Info error={false} sections={sections} headline={"Terms & Conditions"}/>
        </div>
    );
};

export default TermsPage;
