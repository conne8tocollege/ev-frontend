import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import { useState } from "react"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useNavigate } from "react-router-dom"
const apiUrl = import.meta.env.VITE_BASE_URL
export default function CreateProduct() {
  const [file, setFile] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({
    name:"",
    startingPrice: "",
    motor: "",
    speed: "",
    brake: "",
    battery: "",
    range: "",
    instrument: "",
    tyre: "",
    additional: "",
  })
  const [publishError, setPublishError] = useState(null)

  const navigate = useNavigate()

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image")
        return
      }
      setImageUploadError(null)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + "-" + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setImageUploadError(`Image upload failed ${error}`)
          setImageUploadProgress(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null)
            setImageUploadError(null)
            setFormData({ ...formData, image: downloadURL })
          })
        },
      )
    } catch (error) {
      setImageUploadError("Image upload failed")
      setImageUploadProgress(null)
      console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("access_token")
      // console.log(token);
      const res = await fetch(`${apiUrl}/api/product/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setPublishError(data.message)
        return
      }

      if (res.ok) {
        setPublishError(null)
        navigate(`/dashboard?tab=products`)
      }
    } catch (error) {
      setPublishError("Something went wrong")
    }
  }
  console.log(formData)
  return (
    <div className="max-w-3xl mx-auto min-h-screen border p-5 mt-32">
      <h1 className="text-center text-3xl my-7 font-semibold">Create Product</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="flex-1">
            <label htmlFor="name" className="mb-1 text-sm font-medium">
              Name
            </label>
            <TextInput
              type="text"
              placeholder="Enter product name"
              required
              id="name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        {/* File Upload Field */}
        <div className="flex flex-col gap-4 ">
          <label htmlFor="image" className="mb-1 text-sm font-medium">
            Product Image
          </label>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type="file" accept="image/*" id="image" onChange={(e) => setFile(e.target.files[0])} />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
          {formData.image && (
            <img
              src={formData.image || "/placeholder.svg"}
              alt="Uploaded preview"
              className="w-full h-72 object-cover"
            />
          )}
        </div>

        {/* New fields - Part 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startingPrice" className="block font-medium mb-2">
              Starting Price
            </label>
            <TextInput
              type="text"
              id="startingPrice"
              placeholder="Enter starting price"
              onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
              value={formData.startingPrice || ""}
            />
          </div>
          <div>
            <label htmlFor="motor" className="block font-medium mb-2">
              Motor
            </label>
            <TextInput
              type="text"
              id="motor"
              placeholder="Enter motor details"
              onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
              value={formData.motor || ""}
            />
          </div>
          <div>
            <label htmlFor="speed" className="block font-medium mb-2">
              Speed
            </label>
            <TextInput
              type="text"
              id="speed"
              placeholder="Enter speed details"
              onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
              value={formData.speed || ""}
            />
          </div>
          <div>
            <label htmlFor="brake" className="block font-medium mb-2">
              Brake
            </label>
            <TextInput
              type="text"
              id="brake"
              placeholder="Enter brake details"
              onChange={(e) => setFormData({ ...formData, brake: e.target.value })}
              value={formData.brake || ""}
            />
          </div>
        </div>

        {/* New fields - Part 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="battery" className="block font-medium mb-2">
              Battery
            </label>
            <TextInput
              type="text"
              id="battery"
              placeholder="Enter battery details"
              onChange={(e) => setFormData({ ...formData, battery: e.target.value })}
              value={formData.battery || ""}
            />
          </div>
          <div>
            <label htmlFor="range" className="block font-medium mb-2">
              Range
            </label>
            <TextInput
              type="text"
              id="range"
              placeholder="Enter range details"
              onChange={(e) => setFormData({ ...formData, range: e.target.value })}
              value={formData.range || ""}
            />
          </div>
          <div>
            <label htmlFor="instrument" className="block font-medium mb-2">
              Instrument
            </label>
            <TextInput
              type="text"
              id="instrument"
              placeholder="Enter instrument details"
              onChange={(e) => setFormData({ ...formData, instrument: e.target.value })}
              value={formData.instrument || ""}
            />
          </div>
          <div>
            <label htmlFor="tyre" className="block font-medium mb-2">
              Tyre
            </label>
            <TextInput
              type="text"
              id="tyre"
              placeholder="Enter tyre details"
              onChange={(e) => setFormData({ ...formData, tyre: e.target.value })}
              value={formData.tyre || ""}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="additional" className="block font-medium mb-2">
            Additional Information
          </label>
          <Textarea
            id="additional"
            placeholder="Enter additional information"
            rows={4}
            onChange={(e) => setFormData({ ...formData, additional: e.target.value })}
            value={formData.additional || ""}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="bg-cyan-400 text-white hover:bg-cyan-400/90">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  )
}

