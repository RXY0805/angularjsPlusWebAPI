using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace FIFA14.Controllers
{
    public class FilesController : ApiController
    {
        [HttpPost]
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = GetMultipartProvider();
            var result = await Request.Content.ReadAsMultipartAsync(provider);

            // On upload, files are given a generic name like "BodyPart_26d6abe1-3ae1-416a-9429-b35f15e6e5d5"
            // so this is how you can get the original file name
            var originalFileName = GetDeserializedFileName(result.FileData.First());
            var uploadedFileName = "";
            var fileInfo = GetFormData<UploadFileInfo>(result);

            UploadFileInfo info = (UploadFileInfo)fileInfo;


            foreach (MultipartFileData fileData in provider.FileData)
            {
                if (string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
                {
                    return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
                }

                string fileName = fileData.Headers.ContentDisposition.FileName ;

                if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
                {
                    fileName = fileName.Trim('"');
                }
                if (fileName.Contains(@"/") || fileName.Contains(@"\"))
                {
                    fileName = Path.GetFileName(fileName);
                }
                int pointPosition = fileName.IndexOf(".");
                fileName = fileName.Substring(0, pointPosition) + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + fileName.Substring(pointPosition);
                File.Move(fileData.LocalFileName, Path.Combine(HttpContext.Current.Server.MapPath("~/app/images/" + info.FolderName), fileName));
                uploadedFileName = fileName;
                //Images/" + folderName+"/"
            }

            // uploadedFileInfo object will give you some additional stuff like file length,
            // creation time, directory name, a few filesystem methods etc..

            //var uploadedFileInfo = new FileInfo(result.FileData.First().LocalFileName);
            var uploadedFileInfo = new FileInfo(originalFileName);
            // Remove this line as well as GetFormData method if you're not
            // sending any form data with your upload request


            // Through the request response you can return an object to the Angular controller
            // You will be able to access this in the .success callback through its data attribute
            // If you want to send something to the .error callback, use the HttpStatusCode.BadRequest instead
            
           // var returnData = originalFileName;
           //by wade
           // var returnData = fileName;
            return this.Request.CreateResponse(HttpStatusCode.OK, uploadedFileName);
        }


        private MultipartFormDataStreamProvider GetMultipartProvider()
        {
            // IMPORTANT: replace "(tilde)" with the real tilde character
            // (our editor doesn't allow it, so I just wrote "(tilde)" instead)
            var uploadFolder = "~/App_Data/Images"; // you could put this to web.config
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);
            return new MultipartFormDataStreamProvider(root);
        }

        // Extracts Request FormatData as a strongly typed model
        private object GetFormData<T>(MultipartFormDataStreamProvider result)
        {
            if (result.FormData.HasKeys())
            {
                var unescapedFormData = Uri.UnescapeDataString(result.FormData
                    .GetValues(0).FirstOrDefault() ?? String.Empty);
                if (!String.IsNullOrEmpty(unescapedFormData))
                    return JsonConvert.DeserializeObject<T>(unescapedFormData);
            }

            return null;
        }

        private string GetDeserializedFileName(MultipartFileData fileData)
        {
            var fileName = GetFileName(fileData);
            return JsonConvert.DeserializeObject(fileName).ToString();
        }

        public string GetFileName(MultipartFileData fileData)
        {
            return fileData.Headers.ContentDisposition.FileName;
        }

    }

    public class UploadFileInfo
    {
        public string FolderName { get; set; }
    }
}
