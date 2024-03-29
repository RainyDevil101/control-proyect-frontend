import axios from "axios"

const uploadImageTwo = async ( imageTwo ) => {


    if (! imageTwo ) return

    try {

        const formData = new FormData()
        formData.append('upload_preset', 'refunds')
        formData.append('file', imageTwo)



        const {data} = await axios.post('https://api.cloudinary.com/v1_1/dt4zmocge/image/upload', formData)

        return data.secure_url

    } catch (error) {
        console.error('Error al cargar el archivo');
        return null
    }

}

export default uploadImageTwo