import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            username: 'dattan',
            email:'dattan2911@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin',
            address: 'TPHCM',
            birthday: '1/1/2001',
            phone: '123456789',
            isActive: true,
        },
        {
            username: 'abc',
            email:'abc@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'customer',
            address: 'TPHCM',
            birthday: '1/1/2001',
            phone: '123456789',
            isActive: true,
        },
        {
            username: 'lam',
            email:'lam@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin',
            address: 'TPHCM',
            birthday: '1/1/2001',
            phone: '123456789',
            isActive: true,
        },
        {
            username: 'khang',
            email:'khang@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin',
            address: 'TPHCM',
            birthday: '1/1/2001',
            phone: '123456789',
            isActive: true,
        },
    ],
    products: [
        {
            name: "Nike Air Force 1 Mid React",
            slug:"nike-air-force-1-mid-react",
            countInStock: 12,
            brand: "Nike",
            category: "Men",
            size: 29,
            price: 500,
            image: '/images/airforce1midreact.png',
            rating: 3.9,
            numReviews: 10,
            description: 'Trending for the boys',
        },
        { 
            name: "Nike Air Max 97 SE",
            slug:"nike-air-max-97-SE",
            countInStock: 10,
            brand: "Nike",
            category: "Women",
            size: 27,
            price: 450,
            image: '/images/airmax97se.png',
            rating: 4,
            numReviews: 15,
            description: 'Best for women',
        },
        {
            name: "Predator Mutator 20.3 TURF",
            slug:"predator_mutator_20.3_turf",
            countInStock: 1,
            brand: "Adidas",
            category: "Men",
            size: 29,
            price: 600,
            image: '/images/PREDATORMUTATOR203TURF.png',
            rating: 5,
            numReviews: 10,
            description: 'Best choice for football',
        },
        {
            name: "Adidas 4DFWD 2",
            slug:"adidas-4dfwd-2",
            countInStock: 0,
            brand: "Adidas",
            category: "Men",
            size: 30,
            price: 800,
            image: '/images/ADIDAS4DFWD2.png',
            rating: 4.9,
            numReviews: 10,
            description: 'Running man!',
        },
        {
            name: "Nike Air Deldon Lyme",
            slug:"nike-air-deldon-lyme",
            countInStock: 20,
            brand: "Nike",
            category: "Women",
            size: 28,
            price: 650,
            image: '/images/NikeAirDeldonLyme.png',
            rating: 4.9,
            numReviews: 10,
            description: 'Easy On/Off Basketball Shoes',
        },
    ],
};
export default data;
