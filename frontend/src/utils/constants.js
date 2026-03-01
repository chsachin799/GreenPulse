export const API_BASE_URL = 'http://127.0.0.1:5000';

export const COUNTRIES = [
    'Albania', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Botswana', 'Brazil', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chile', 'Colombia',
    'Croatia', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Eritrea', 'Estonia',
    'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Guinea', 'Guyana', 'Haiti',
    'Honduras', 'Hungary', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Italy', 'Jamaica', 'Japan',
    'Kazakhstan', 'Kenya', 'Latvia', 'Lebanon', 'Lesotho', 'Libya', 'Lithuania', 'Madagascar',
    'Malawi', 'Malaysia', 'Mali', 'Mauritania', 'Mauritius', 'Mexico', 'Montenegro', 'Morocco',
    'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Norway',
    'Pakistan', 'Papua New Guinea', 'Peru', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda',
    'Saudi Arabia', 'Senegal', 'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
    'Sweden', 'Switzerland', 'Tajikistan', 'Thailand', 'Tunisia', 'Turkey', 'Uganda', 'Ukraine',
    'United Kingdom', 'Uruguay', 'Zambia', 'Zimbabwe'
];

export const CROPS = [
    'Cassava', 'Maize', 'Plantains and others', 'Potatoes', 'Rice, paddy',
    'Sorghum', 'Soybeans', 'Sweet potatoes', 'Wheat', 'Yams'
];

// Crop-Specific Constraints for Validation
export const CROP_CONSTRAINTS = {
    'Cassava': { rainMin: 500, rainMax: 5000, tempMin: 10, tempMax: 35 },
    'Maize': { rainMin: 500, rainMax: 1500, tempMin: 10, tempMax: 35 },
    'Plantains and others': { rainMin: 1500, rainMax: 2500, tempMin: 18, tempMax: 38 },
    'Potatoes': { rainMin: 500, rainMax: 1200, tempMin: 7, tempMax: 25 },
    'Rice, paddy': { rainMin: 1000, rainMax: 3000, tempMin: 20, tempMax: 40 },
    'Sorghum': { rainMin: 400, rainMax: 750, tempMin: 15, tempMax: 40 },
    'Soybeans': { rainMin: 450, rainMax: 850, tempMin: 15, tempMax: 35 },
    'Sweet potatoes': { rainMin: 750, rainMax: 1500, tempMin: 15, tempMax: 35 },
    'Wheat': { rainMin: 300, rainMax: 1100, tempMin: 3, tempMax: 32 },
    'Yams': { rainMin: 1000, rainMax: 3000, tempMin: 20, tempMax: 35 }
};
