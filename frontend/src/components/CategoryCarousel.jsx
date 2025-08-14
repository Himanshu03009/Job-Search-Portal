import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Mobile App Developer",
  "Cybersecurity Specialist",
  "Cloud Engineer",
  "AI / Machine Learning Engineer",
  "UI/UX Designer",
  "Software Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-4xl mx-auto my-8 px-2">
        <CarouselContent className="gap-2">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6 flex justify-center">
              <Button
                onClick={() => searchJobHandler(cat)}
                className="rounded-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white 
                           transition-colors duration-200 px-4 py-1.5 text-xs font-medium shadow-sm 
                           whitespace-normal leading-tight text-center min-h-[36px]"
                variant="outline"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
