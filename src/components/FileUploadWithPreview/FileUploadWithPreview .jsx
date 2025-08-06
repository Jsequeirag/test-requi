import React, { useState } from "react";
import { Eye, X, Upload, FileText, ImageIcon } from "lucide-react";

const FileUploadWithPreview = ({
  name,
  onFileChange,
  accept = ".pdf, image/*",
  className = "",
  placeholder = "Seleccionar archivo...",
  id,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const convertirBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const archivoSeleccionado = e.target.files[0];
    setIsLoading(true);

    if (archivoSeleccionado) {
      try {
        const base64 = await convertirBase64(archivoSeleccionado);
        setSelectedFile(archivoSeleccionado);
        setPreviewData(base64);

        // Llamar al callback del padre
        onFileChange({
          [name]: base64,
          file: archivoSeleccionado,
        });
      } catch (error) {
        console.error("Error al convertir a Base64:", error);
        setSelectedFile(null);
        setPreviewData(null);
        onFileChange({
          [name]: null,
          file: null,
        });
      }
    } else {
      setSelectedFile(null);
      setPreviewData(null);
      onFileChange({
        [name]: null,
        file: null,
      });
    }
    setIsLoading(false);
  };

  const openPreview = () => {
    if (previewData) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewData(null);
    onFileChange({
      [name]: null,
      file: null,
    });
    // Limpiar el input
    const input = document.getElementById(id || name);
    if (input) input.value = "";
  };

  const isImage = selectedFile?.type?.startsWith("image/");
  const isPDF = selectedFile?.type === "application/pdf";

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Input de archivo */}
      <div className="relative">
        <input
          className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                     bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                     dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          id={id || name}
          type="file"
          name={name}
          onChange={handleFileChange}
          accept={accept}
          autoComplete="off"
          disabled={isLoading}
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Vista previa del archivo seleccionado */}
      {selectedFile && (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {isImage ? (
                <ImageIcon className="h-8 w-8 text-green-500" />
              ) : isPDF ? (
                <FileText className="h-8 w-8 text-red-500" />
              ) : (
                <Upload className="h-8 w-8 text-gray-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={openPreview}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-full transition-colors"
              title="Ver archivo"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={removeFile}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-full transition-colors"
              title="Eliminar archivo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal de vista previa */}
      {showModal && previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] w-full flex flex-col">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Vista previa: {selectedFile.name}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="flex-1 p-4 overflow-auto">
              {isImage ? (
                <div className="flex justify-center">
                  <img
                    src={previewData}
                    alt={selectedFile.name}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                </div>
              ) : isPDF ? (
                <div className="w-full h-96">
                  <iframe
                    src={previewData}
                    title={selectedFile.name}
                    className="w-full h-full border-0 rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Vista previa no disponible para este tipo de archivo
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Tipo: {selectedFile.type}
                  </p>
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadWithPreview;
