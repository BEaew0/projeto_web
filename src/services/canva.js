import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

/**
 * Exporta um elemento HTML para imagem PNG
 * @param {string} elementId - ID do elemento a ser capturado
 * @param {string} [fileName='imagem'] - Nome base do arquivo
 * @param {object} [options] - Opções adicionais para html2canvas
 */
export const exportToPNG = async (elementId, fileName = 'imagem', options = {}) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento com ID ${elementId} não encontrado`);
  }

  try {
    const defaultOptions = {
      scale: 2,
      logging: false,
      useCORS: true,
      ...options
    };

    const canvas = await html2canvas(element, defaultOptions);
    canvas.toBlob((blob) => {
      saveAs(blob, `${fileName}.png`);
    });
  } catch (error) {
    console.error('Erro ao exportar para PNG:', error);
    throw error;
  }
};

/**
 * Exporta um elemento HTML para imagem JPEG
 * @param {string} elementId - ID do elemento a ser capturado
 * @param {string} [fileName='imagem'] - Nome base do arquivo
 * @param {number} [quality=0.95] - Qualidade da imagem (0-1)
 */
export const exportToJPEG = async (elementId, fileName = 'imagem', quality = 0.95) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento com ID ${elementId} não encontrado`);
  }

  try {
    const canvas = await html2canvas(element, { scale: 2 });
    canvas.toBlob((blob) => {
      saveAs(blob, `${fileName}.jpeg`);
    }, 'image/jpeg', quality);
  } catch (error) {
    console.error('Erro ao exportar para JPEG:', error);
    throw error;
  }
};