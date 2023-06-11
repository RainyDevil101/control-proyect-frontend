import axios from "axios"

const uploadImageOne = async ( imageOne ) => {

    if (! imageOne ) return
    
    try {
        
        const formData = new FormData()
        formData.append('upload_preset', 'refunds')
        formData.append('file', imageOne)

        const {data} = await axios.post('https://api.cloudinary.com/v1_1/dt4zmocge/image/upload', formData)

        return data.secure_url



    } catch (error) {
        console.error('Error al cargar el archivo');
        return null
    }

}

export default uploadImageOne