import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: [
            "Delhi NCR",
            "Bangalore",
            "Hyderabad",
            "Pune",
            "Mumbai",
            "Chennai",
            "Gurgaon",
            "Noida",
            "Ahmedabad",
            "Kolkata",
            "Jaipur",
            "Redmond, Washington, USA",
            "Cupertino, California, USA",
            "San Francisco, California, USA",
            "New York City, USA",
            "London, United Kingdom",
            "Berlin, Germany",
            "Sydney, Australia",
            "Toronto, Canada",
            "Singapore"

        ],
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "Software Engineer – iOS Development",
            "Software Engineer – Cloud Services",
            "Data Science",
            "Graphic Designer",
            "Mobile App Developer",
            "Cybersecurity Specialist",
            "Cloud Engineer",
            "AI / Machine Learning Engineer",
            "UI/UX Designer",
            "Software Developer"
        ],
    },
    {
        filterType: "Salary",
        array: ["1LPA-10LPA", "11LPA-20LPA", "21LPA-40LPA", "41LPA-60LPA", "61LPA-1CR"],
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h1 className="text-2xl font-semibold mb-5 text-gray-900">Filter Jobs</h1>
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                {filterData.map((section, idx) => (
                    <section key={idx} className="space-y-3">
                        <h2 className="text-lg font-medium text-gray-800 border-b border-gray-300 pb-1">
                            {section.filterType}
                        </h2>
                        <div className="space-y-2">
                            {section.array.map((item, itemIdx) => {
                                const itemId = `filter-${idx}-${itemIdx}`;
                                return (
                                    <div key={itemId} className="flex items-center space-x-3 cursor-pointer group">
                                        <RadioGroupItem
                                            value={item}
                                            id={itemId}
                                            className="h-5 w-5 border-2 border-gray-300 rounded-full transition-colors group-hover:border-[#7209b7] checked:border-[#7209b7] checked:bg-[#7209b7]"
                                        />
                                        <Label
                                            htmlFor={itemId}
                                            className="text-gray-700 select-none cursor-pointer hover:text-[#7209b7] transition-colors"
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
