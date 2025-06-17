import ApiService from "./axiosInstance";

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  console.log(byteArrays, "ssss");
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export function upload(payload, fileData) {
  return new Promise((resolve, reject) => {
    ApiService.post("files", payload)
      .then((response) => {
        const data = response.data?.preSignedUrl?.data;
        console.log(data);
        const formData = new FormData();
        const blob = b64toBlob(fileData, payload.file_type);
        const fields = data.fields;
        const url = data.url;

        // Append form fields
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });

        // Append the actual file
        formData.append("file", blob);

        // Upload the file to the pre-signed URL
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then(() => {
            resolve(data);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("API error:", error);
        reject(error);
      });
  });
}
