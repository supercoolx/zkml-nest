import { useState, useRef, useEffect } from 'react';
import { AttachFile, Add, ArrowUpward } from "@mui/icons-material";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import axios from 'axios';
import logoURL from '../assets/img/logo.png'; // Import your logo

const V0ChatForm = () => {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const generatePDF = async (content: string[]) => {
    const pdfDoc = await PDFDocument.create();
    const pageMargin = 50;
    const pageWidth = 595.28; // A4 width in points
    const pageHeight = 841.89; // A4 height in points

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const lineHeight = fontSize * 1.5;

    // Fetch the logo
    const logoImageBytes = await fetch(logoURL).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    // Calculate logo dimensions (assuming we want it 100px wide)
    const logoDims = logoImage.scale(100 / logoImage.width);

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let cursorY = pageHeight - pageMargin;

    // Draw logo on the first page
    currentPage.drawImage(logoImage, {
      x: pageWidth - logoDims.width - pageMargin,
      y: pageHeight - logoDims.height - pageMargin,
      width: logoDims.width,
      height: logoDims.height,
    });

    content.forEach((line) => {
      if (cursorY < pageMargin + lineHeight) {
        // Add a new page when reaching the bottom
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        cursorY = pageHeight - pageMargin;

        // Draw logo on each new page
        currentPage.drawImage(logoImage, {
          x: pageWidth - logoDims.width - pageMargin,
          y: pageHeight - logoDims.height - pageMargin,
          width: logoDims.width,
          height: logoDims.height,
        });
      }

      currentPage.drawText(line, {
        x: pageMargin,
        y: cursorY,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      cursorY -= lineHeight;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'message_with_logo.pdf';
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // if (message.trim().length === 0) return alert('Insert message.');
      // if (!fileInputRef.current.files?.length) return alert('Attach image.');

      // const formData = new FormData();
      // formData.append('title', 'Website inspection');
      // formData.append('description', message);
      // formData.append('screenshots', fileInputRef.current.files[0]);

      // const res = await axios.post('/audits/123/assets', formData, { headers: { "Content-Type": 'multipart/form-data' } });
      // if (res.data) console.log(res.data);
      // // Generate PDF with the message
      
      // await generatePDF(res.data.data.content.split('\n\n'));

      const contents = new Array(100).fill('This is the test\n\n').join('');
      await generatePDF(contents.split('\n\n'));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const handleAttachFile = () => {
    fileInputRef.current.click();
  }

  const handleChangeFile = () => {
    setFileName(fileInputRef.current && fileInputRef.current.files ? fileInputRef.current.files[0]?.name : '');
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-[#38E5FF80] to-[#38E5FF80] rounded-xl blur-2xl opacity-50"></div>
      <div className="w-full relative bg-[#18181be6] rounded-lg border border-[#313131] text-white p-4 mb-6 overflow-hidden">
        {loading && <div className="absolute inset-0 z-10 flex items-center justify-center text-4xl backdrop-blur-sm">Loading...</div>}
        <textarea
          placeholder="Ask zkml a question..."
          className="w-full h-20 text-lg text-white placeholder-gray-600 bg-transparent focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-between mt-4 font-medium text-gray-300">
          <div className="flex items-center gap-4">
            <button onClick={handleAttachFile} className="p-2 border border-[#313131] flex items-center focus:outline-none">
              <AttachFile className="w-5 h-5" />
              {fileName && <span className="ml-2 leading-none">{fileName}</span>}
            </button>
            <input ref={fileInputRef} onChange={handleChangeFile} type="file" name="" id="" className="hidden" />
            <button className="hidden items-center p-2 border border-[#313131]">
              <Add className="w-5 h-5 mr-1" />
              Project
            </button>
          </div>
          <button className="bg-zinc-800 p-1 border border-[#313131] rounded hover:bg-zinc-700" onClick={() => handleSubmit()}>
            <ArrowUpward className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default V0ChatForm;
