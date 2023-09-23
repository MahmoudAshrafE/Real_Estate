import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProperty, removeBooking } from '../../utils/api';
import { PulseLoader } from 'react-spinners';
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai';
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md';
import { FaShower } from 'react-icons/fa';
import './property.css'
import Map from '../../components/Map/Map';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../../components/BookingModal/BookingModal';
import { useDetailsContext } from '../../contexts/userDeatilesContext';
import { toast } from 'react-toastify';
import Heart from '../../components/Heart/Heart';

const Property = () => {

    const { id } = useParams();

    const { data, isLoading, isError } = useQuery(["resd", id], () => getProperty(id))

    const handleBookingSuccess = () => {
        toast.success("Booking canceled", {
            position: "bottom-right",
        });
        setUserDetails((prev) => ({
            ...prev,
            bookings: prev?.bookings.filter((booking) => booking?.id !== id)
        }));
    };
    
    const { mutate: cancelBooking, isLoading: canceling } = useMutation({
        mutationFn: () => removeBooking(id, user?.email, token),
        onSuccess: () => handleBookingSuccess(),
    });


    const [modelOpened, setModelOpened] = useState(false);

    const { validateLogin } = useAuthCheck()

    const { user } = useAuth0()

    const {
        userDetails: { token, bookings },
        setUserDetails,
    } = useDetailsContext();

    if (isError) {
        return (
            <div className='wrapper'>
                <span>Error while fetching data</span>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="wrapper flexCenter" style={{ height: "60vh" }}>

                <PulseLoader color="var(--blue)" />
            </div>
        )
    }

    return (
        <div className="wrapper">
            <div className="flexColStart paddings innerWidth property-container">
                {/* like button */}
                <div className="like">
                    <Heart id={id} />
                </div>

                {/* image */}
                <img src={data?.image} alt="home image" />

                <div className="flexCenter property-details">
                    {/* left */}
                    <div className="flexColStart left">
                        {/* head */}
                        <div className="flexStart head">
                            <span className="primaryText">{data?.title}</span>
                            <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                                $ {data?.price}
                            </span>
                        </div>

                        {/* facilities */}
                        <div className="flexStart facilities">
                            {/* bathrooms */}
                            <div className="flexStart facility">
                                <FaShower size={20} color="#1F3E72" />
                                <span>{data?.facilities?.bathrooms} Bathrooms</span>
                            </div>

                            {/* parkings */}
                            <div className="flexStart facility">
                                <AiTwotoneCar size={20} color="#1F3E72" />
                                <span>{data?.facilities.parkings} Parking</span>
                            </div>

                            {/* rooms */}
                            <div className="flexStart facility">
                                <MdMeetingRoom size={20} color="#1F3E72" />
                                <span>{data?.facilities.bedrooms} Room/s</span>
                            </div>
                        </div>

                        {/* description */}

                        <span className="secondaryText" style={{ textAlign: "justify" }}>
                            {data?.description}
                        </span>

                        {/* address */}

                        <div className="flexStart" style={{ gap: "1rem" }}>
                            <MdLocationPin size={25} />
                            <span className="secondaryText">
                                {data?.address}{" "}
                                {data?.city}{" "}
                                {data?.country}
                            </span>

                        </div>

                        {
                            bookings?.map((booking) => booking.id).includes(id) ? (
                                <>
                                <button className='button cancel__btn' disabled={canceling}  onClick={() => cancelBooking()  } >
                                {canceling ?
                                        <span>Cancel...</span>
                                        :
                                        <span>Cancel your visit</span>
                                }
                                    </button>
                                    <span>Your visit already booked for date {bookings?.filter((booking) => booking.id === id)[0].date}</span>
                                
                                    </>
                            ):
                            (
                        <button className='button' onClick={() => {
                            validateLogin() && setModelOpened(true);
                        }}>
                                Book your visit
                            </button>
                            
                            )
                            
                            }
                            <BookingModal opened={modelOpened} setOpened={setModelOpened} propertyId={id} email={user?.email} />
                    </div>
                    
                    <div className="map">
                            <Map
                                address={data?.address}
                                city={data?.city}
                                country={data?.country}
                            />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Property