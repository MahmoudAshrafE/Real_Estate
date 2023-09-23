import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';

import './contactForm.css'
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../pages/Router/paths';
import { email_public_id, email_service, email_template } from '../../config/api';
const ContactPage = () => {

    const { user } = useAuth0();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const Navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the email using emailjs
        emailjs.sendForm(
            email_service,
            email_template,
            e.target,
            email_public_id
        )
            .then((response) => {
                toast.success('Message sent successfully!');
            })
            .catch((error) => {
                toast.error('Error sending email. Please try again later.');
            });
            Navigate(PATHS.HOME)
    };

    useEffect(() => {
        if (user?.email) {
            setFormData((prevDetails) => ({
                ...prevDetails,
                email: user.email,
            }));
        }
    }, [user]);

    return (
        <div className='Contact__content'>
            <h2 className='contact__title'>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button className="button" type="submit" >Submit</button>
            </form>
        </div>
    );
};

export default ContactPage;
