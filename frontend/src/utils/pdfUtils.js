import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function saveAsPDF() {
  const element = document.querySelector('.canvas') || 
                  document.querySelector('.panel.canvas') ||
                  document.querySelector('[class*="canvas"]') ||
                  document.querySelector('.app-container');
  
  if (!element) {
    alert('No form content found to export as PDF!');
    return;
  }

  try {
    const canvas = await html2canvas(element, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const widthRatio = pdfWidth / imgProps.width;
    const heightRatio = pdfHeight / imgProps.height;
    const ratio = Math.min(widthRatio, heightRatio);
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;
    const x = (pdfWidth - imgWidth) / 2;
    const y = 20;

    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save('form-builder.pdf');
    alert('PDF saved successfully!');
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('Failed to generate PDF: ' + error.message);
  }
}

export function clearForm() {
  if (window.confirm(' Are you sure you want to clear the entire form?')) {
    window.location.reload();
  }
}
