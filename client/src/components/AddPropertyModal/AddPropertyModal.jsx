  import React, {useEffect, useState} from 'react'
  import { Modal, Stepper, Button, Group, Container } from "@mantine/core";
  import AddLocation from '../AddLocation/AddLocation';
  import { useAuth0 } from "@auth0/auth0-react";
  import UploadImages from '../UploadImages/UploadImages';
  import BasicDetails from '../BasicDetails/BasicDetails';
  import Facilities from '../Facilities/Facilities';

  const AddPropertyModal = ({ opened, setOpened }) => {

    const [active, setActive] = useState(0);

    const { user } = useAuth0();
    const [propertyDetails, setPropertyDetails] = useState({
      title: "",
      description: "",
      price: 0,
      country: "",
      city: "",
      address: "",
      image: null,
      facilities: {
        bedrooms: 0,
        parkings: 0,
        bathrooms: 0,
      },
      userEmail:"",
    });

    useEffect(() => {
      // Set userEmail when the user object changes
      if (user?.email) {
        setPropertyDetails((prevDetails) => ({
          ...prevDetails,
          userEmail: user.email,
        }));
      }
    }, [user]);

    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
      <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
      >
        <Container h={"40rem"} w={"100%"} >
        <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
          <Stepper.Step label="Location" description="Address">
            <AddLocation 
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload">
            <UploadImages 
            prevStep={prevStep}
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Basic Details" description="set a Basic details">
            <BasicDetails
            prevStep={prevStep}
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Facilities" description="Facilities">
            <Facilities
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            setOpened={setOpened}
            setActiveStep={setActive}
            />
          </Stepper.Step>
          <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
        </Stepper>
        </Container>
    
      </Modal>
    )
  }

  export default AddPropertyModal