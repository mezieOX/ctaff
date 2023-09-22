const Stem = ({ className }: { className: string }) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".cls-1{fill:#fff;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}",
          }}
        />
      </defs>
      <ellipse className="cls-1" cx={12} cy={12} rx="3.82" ry="10.5" />
      <ellipse
        className="cls-1"
        cx={12}
        cy={12}
        rx="3.82"
        ry="10.5"
        transform="translate(-4.39 16.39) rotate(-60)"
      />
      <ellipse
        className="cls-1"
        cx={12}
        cy={12}
        rx="10.5"
        ry="3.82"
        transform="translate(-4.39 7.61) rotate(-30)"
      />
    </svg>
  );
};

export default Stem