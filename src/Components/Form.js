import React, { useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header';

export const Form = () => {

    const [details, setDetails] = useState({
        'ID': '',
        'Name': '',
        'Age': '',
        'Email': '',
        'Batch': '6-7AM'
    });

    const [warn, setWarn] = useState({ warning: "Your age should be between 18 to 65 years.", disable: false });
    const [paid, setPaid] = useState(false);
    const [paymentWarn, setPaymentWarn] = useState(false);

    const handleChange = (eve) => {
        const { name } = eve.target;

        if (name === 'Age') {
            let age = Number(eve.target.value);
            if (age < 18 || age > 65)
                setWarn({ warning: "Your age is not appropriate for this program.", disable: true });
            else
                setWarn({ warning: "Your age should be between 18 to 65 years.", disable: false });
        }
        setDetails(pre => {
            return { ...pre, [name]: eve.target.value }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handlePayment = () => {
        alert("Processing Payment.");
        console.log(JSON.stringify(details));
        fetch('http://localhost:3001/payment')
            .then(res => {
                if (res.status === 200) {
                    setPaid(true);
                    fetch('http://localhost:3001/enroll', {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(details)
                    }).then(res => res.json())
                        .then(data => console.log(data))
                }
                else
                    setPaymentWarn(true)
            });
    };

    return (
        <Container>
            <Box>
                <Header />
                <form onSubmit={handleSubmit}>

                    <div>
                        <h4 style={{ marginBottom: ".25em" }}>Name</h4>
                        <Input required disabled={paid} placeholder='John Doe' name='Name' type="text" value={details.Name} style={{ width: "90%" }} onChange={handleChange} />
                    </div>

                    <div>
                        <h4 style={{ marginBottom: ".25em" }}>Email Address</h4>
                        <Input required disabled={paid} placeholder='Johndoe124@gmail.com' name='Email' type="email" value={details.Email} style={{ width: "90%" }} onChange={handleChange} />
                    </div>

                    <div style={{ display: "inline" }}>
                        <h4 style={{ marginBottom: ".25em" }}>Age</h4>
                        <Input required disabled={paid} placeholder='23' min={18} max={65} name='Age' type="number" value={details.Age} style={{ width: "40%" }} onChange={handleChange} />
                        <p style={{ display: paid ? "none" : "inline", marginLeft: "1em", fontSize: "1em", fontWeight: "bold", color: warn.disable ? "rgba(100, 0, 0, 0.6)" : "" }}>
                            {warn.warning}
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: ".25em" }}>Batch</h4>
                        <Select disabled={paid} name='Batch' onChange={handleChange}>
                            <option value={"6-7AM"}>6 - 7 AM</option>
                            <option value={"7-8AM"}>7 - 8 AM</option>
                            <option value={"8-9AM"}>8 - 9 AM</option>
                            <option value={"5-6PM"}>5 - 6 PM</option>
                        </Select>
                        <p style={{ display: "inline", marginLeft: "1em", fontSize: "1em", fontWeight: "bold" }}>
                            {
                                paid ? "" : "Please select a time slot that is convenient to you."
                            }
                        </p>
                    </div>

                    <Button disabled={warn.disable || paid} onClick={handlePayment}> {paid ? "Done😊" : "Make Payment"} </Button>
                    <p style={{ display: "inline", marginLeft: "1em", fontSize: "1em", fontWeight: "bold" }}>
                        {!paid ? "The fees of this yoga classes is 500 Rs. / month." : ""}
                    </p>
                    <br />
                    {/* <Button disabled={!paid} onClick={() => console.log(details)}> Enroll </Button> */}
                    <p style={{ display: "inline", fontSize: "1.1em", fontWeight: "bold", color: paid ? "rgba(0, 255, 0, .5)" : "" }}>
                        {
                            paid ?
                                "Thank You for enrolling for this yoga class!" :
                                paymentWarn ?
                                    "Please Try again😕" :
                                    "Enroll to this yoga class and take a step towards healthy life."
                        }
                    </p>

                </form>
            </Box>
        </Container >
    )
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    width: 50%;
    color: white;
    height: auto;
    border-radius: 10px;
    margin-inline: auto;
    padding: 1em;
    background-color: #495579;
`;

const Input = styled.input`
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 1.1em;
    padding: .5em 1em;
    margin-bottom: 1em;

    *:focus{
        border: none;
        outline: none;
    }

`;

const Select = styled.select`
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 1.1em;
    padding: .5em 1em;
    margin-bottom: 1em;
    width: 40%;
    *:focus{
        border: none;
        outline: none;
    }
`;

const Button = styled.button`
    background-color: white;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    padding: .5em 1em;
    font-weight: bold;
    margin-bottom: 1em;
    cursor: pointer;
`;