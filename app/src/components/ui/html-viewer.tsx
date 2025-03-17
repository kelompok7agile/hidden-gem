type HtmlViewerProps = {
  htmlContent: string;
};

const HtmlViewer = ({ htmlContent }: HtmlViewerProps) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HtmlViewer;