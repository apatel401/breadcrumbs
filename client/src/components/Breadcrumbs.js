function BreadCrumbs({ crumbs, manageCrumbs }) {
  return (
    <div className="breadcrumb-container">
      {crumbs.map((item, index) => (
        <>
          {/* show seperator if current item is not the first element in crumbs array */}
          {crumbs.length === 1 || index === 0 ? null : <span>{">"}</span>}
          <button
          key={index}
            className="breadcrumb-btn"
            onClick={() => 
              manageCrumbs(index, item)}
          >
            {item}
          </button>
        </>
      ))}
    </div>
  );
}

export default BreadCrumbs;