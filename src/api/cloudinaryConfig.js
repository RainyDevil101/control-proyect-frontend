import cloudinary from 'cloudinary';

const cloudinaryConfig = () => {
     return cloudinary.config({
        cloud_name: 'dt4zmocge',
        api_key: '349555799453545',
        api_secret: '8mYy8whV1kKmGNtBs5HRxuxN9tU'
    });
};

export default cloudinaryConfig;