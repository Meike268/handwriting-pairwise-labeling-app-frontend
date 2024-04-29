const ProgressBar: React.FC<{ current: number, end: number }> = ({current, end}) => {
    const progress = current / end

    console.log("progress: " + progress)
    return <div style={{width: "100%"}}>
        <div style={{width: "100%", height: "4px", display: "flex"}}>
            <div style={{backgroundColor: "green", height: "100%", width: (progress * 100) + "%"}}/>
            <div style={{backgroundColor: "#888", width: ((1 - progress) * 100) + "%"}}/>
        </div>
        <div style={{width: "100%", height: "5px", display: "flex", justifyContent: "space-between"}}>
            <div style={{height: "100%", width: "1px"}}/>
            <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>
            <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>
            <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>
            <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>
            <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>
            <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>
            <div style={{height: "100%", width: "1px", backgroundColor: "white"}}/>
            <div style={{height: "100%", width: "1px"}}/>
        </div>
    </div>
}

export default ProgressBar