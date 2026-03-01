export const getLocalTimeMode = (country) => {
    // Simplified offset map (UTC offsets)
    const offsets = {
        'India': 5.5, 'USA': -5, 'Japan': 9, 'Brazil': -3,
        'UK': 0, 'Germany': 1, 'Australia': 10, 'China': 8,
        'Kenya': 3, 'Nigeria': 1
    };

    const offset = offsets[country] || 0;
    const utcHours = new Date().getUTCHours();
    const localHours = (utcHours + offset + 24) % 24;

    // Day is 6 AM to 6 PM (18:00)
    return (localHours >= 6 && localHours < 18) ? 'day' : 'night';
};
