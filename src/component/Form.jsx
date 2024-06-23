import React, { useState } from 'react';

function Form() {
    const [errors, setErrors] = useState({});
    const [entry, setEntry] = useState({
        FullName: "",
        Email: "",
        Survey: "",
        FeedBack: "",
        Experience: "0",
        Diet: "",
        Technology: "",
        Exercise: "",
        Qualification: "",
        Field: "",
    });

    const validateField = (name, value) => {
        let error = "";

        if (name === "Email") {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!value.match(pattern)) {
                error = "Enter a valid Email Address";
            }
        }

        if (name === "FullName") {
            const pattern = /^[a-zA-Z]+\s[a-zA-Z]+$/;
            if (!pattern.test(value)) {
                error = "Enter Full Name";
            }
        }

        if (name === "Survey" && value === "Select") {
            error = "Please select a survey topic";
        }

        if (name === "FeedBack") {
            const words = value.trim().split(/\s+/).length;
            if (words < 50) {
                error = "Feedback must contain at least 50 words";
            }
        }

        return error;
    };

    const SelectHandler = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);

        setEntry({
            ...entry,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (entry.FullName === "") newErrors.FullName = "Full Name is required";
        if (entry.Email === "") newErrors.Email = "Email is required";
        if (entry.Survey === "Select" || entry.Survey === "") newErrors.Survey = "Required";
        if (entry.FeedBack === "") {
            newErrors.FeedBack = "Required";
        } else {
            const words = entry.FeedBack.trim().split(/\s+/).length;
            if (words < 50) {
                newErrors.FeedBack = "Contain at least 50 words";
            }
        }

        if (entry.Survey === "Technology") {
            if (entry.Technology === "Select" || entry.Technology === "") newErrors.Technology = "Required";
            if (entry.Experience <= 0) newErrors.Experience = "Required";
        }
        if (entry.Survey === "Health") {
            if (entry.Exercise === "Select" || entry.Exercise === "") newErrors.Exercise = "Required";
            if (entry.Diet === "Select" || entry.Diet === "") newErrors.Diet = "Required";
        }
        if (entry.Survey === "Education") {
            if (entry.Qualification === "Select" || entry.Qualification === "") newErrors.Qualification = "Required";
            if (entry.Field === "") newErrors.Field = "Required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted", entry);
        } else {
            console.log("Form contains errors");
        }
    };

    return (
        <div className='flex flex-wrap items-center justify-center min-h-screen bg-gray-100'>
            <form name="Form" className="w-full p-8 text-lg bg-white border-2 rounded-lg shadow-lg md:w-2/3 lg:w-1/2 xl:w-1/3" onSubmit={HandleSubmit}>
                <section className='mb-4'>
                    <label className='block mb-2'>
                        Full Name:
                        <input
                            className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500'
                            name='FullName'
                            type="text"
                            value={entry.FullName}
                            onChange={SelectHandler}
                        />
                    </label>
                    <p className="text-sm text-red-600">{errors.FullName}</p>
                </section>
                <section className='mb-4'>
                    <label className='block mb-2'>
                        Email:
                        <input
                            className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500'
                            name='Email'
                            type="email"
                            value={entry.Email}
                            onChange={SelectHandler}
                        />
                    </label>
                    <p className='text-sm text-red-600'>{errors.Email}</p>
                </section>
                <section className='mb-4'>
                    <label className='block mb-2'>
                        Survey Topic:
                        <select className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500' name='Survey' onChange={SelectHandler}>
                            <option value="Select">Select</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                        </select>
                    </label>
                    <p className='text-sm text-red-600'>{errors.Survey}</p>
                </section>
                {entry.Survey === "Technology" && (
                    <section className='mb-4'>
                        <label className='block mb-2'>
                            Language:
                            <select className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500' name='Technology' onChange={SelectHandler}>
                                <option value="Select">Select</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="C#">C#</option>
                            </select>
                        </label>
                        <p className='text-sm text-red-600'>{errors.Technology}</p>
                        <label className='block mb-2'>
                            Experience:
                            <input
                                className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500'
                                name="Experience"
                                type="number"
                                value={entry.Experience}
                                onChange={SelectHandler}
                            />
                        </label>
                        <p className='text-sm text-red-600'>{errors.Experience}</p>
                    </section>
                )}
                {entry.Survey === "Health" && (
                    <section className='mb-4'>
                        <label className='block mb-2'>
                            Exercise Frequency:
                            <select className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500' name='Exercise' onChange={SelectHandler}>
                                <option value="Select">Select</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Rarely">Rarely</option>
                            </select>
                        </label>
                        <p className='text-sm text-red-600'>{errors.Exercise}</p>
                        <label className='block mb-2'>
                            Diet Preference:
                            <select className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500' name='Diet' onChange={SelectHandler}>
                                <option value="Select">Select</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                                <option value="Rarely">Rarely</option>
                            </select>
                        </label>
                        <p className='text-sm text-red-600'>{errors.Diet}</p>
                    </section>
                )}
                {entry.Survey === "Education" && (
                    <section className='mb-4'>
                        <label className='block mb-2'>
                            Highest Qualification:
                            <select className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500' name='Qualification' onChange={SelectHandler}>
                                <option value="Select">Select</option>
                                <option value="High-School">High School</option>
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </label>
                        <p className='text-sm text-red-600'>{errors.Qualification}</p>
                        <label className='block mb-2'>
                            Field of Study:
                            <input
                                className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500'
                                type="text"
                                name='Field'
                                value={entry.Field}
                                onChange={SelectHandler}
                            />
                        </label>
                        <p className='text-sm text-red-600'>{errors.Field}</p>
                    </section>
                )}
                <section className='mb-4'>
                    <label className='block mb-2'>
                        Feedback:
                        <textarea
                            className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500'
                            name='FeedBack'
                            value={entry.FeedBack}
                            onChange={SelectHandler}
                        />
                    </label>
                    <p className='text-sm text-red-600'>{errors.FeedBack}</p>
                </section>
                <div className='flex justify-center'>
                    <button className='w-full p-2 text-white bg-blue-700 rounded-md shadow-md md:w-1/2 hover:bg-blue-800' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
