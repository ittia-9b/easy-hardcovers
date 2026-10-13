// --- Helper Components ---
const InputField = ({ id, label, value, onChange, colorClass }) => (
    <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colorClass}`}></span>
        <label htmlFor={id} className="flex-shrink-0 w-32 text-sm font-medium text-slate-600">{label}</label>
        <input
            type="number"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-slate-200 rounded-md shadow-sm transition-all focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
        />
    </div>
);

// --- SVG Preview Component ---
const FlatLayoutSVG = ({ dims }) => {
    if (dims.fabricW <= 0 || dims.fabricH <= 0) return null;
    const cutOffset = 2 * dims.fabricMargin - dims.boardT * Math.sqrt(2);

    // --- Key Coordinates ---
    const leftBoardX = dims.fabricMargin;
    const rightBoardX = dims.fabricMargin + dims.boardW + dims.gutter + dims.spineW + dims.gutter;
    const spineX = dims.fabricMargin + dims.boardW + dims.gutter;

    const pageLeftX = dims.fabricMargin + dims.coverMargin;
    const pageRightX = rightBoardX;
    const pageTopY = dims.fabricMargin + dims.coverMargin;

    return (
        <svg viewBox={`-60 -40 ${dims.fabricW + 120} ${dims.fabricH + 80}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>{`.label{font:500 12px 'Inter',sans-serif;text-anchor:middle;stroke:none}.label-sm{font:400 10px 'Inter',sans-serif;text-anchor:middle;stroke:none}`}</style>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker>
            </defs>

            {/* --- Fabric Outline (Red) --- */}
            {/* --- Fabric Outline with Corner Cuts --- */}
            <path d={`M ${cutOffset} 0 L ${dims.fabricW - cutOffset} 0 L ${dims.fabricW} ${cutOffset} L ${dims.fabricW} ${dims.fabricH - cutOffset} L ${dims.fabricW - cutOffset} ${dims.fabricH} L ${cutOffset} ${dims.fabricH} L 0 ${dims.fabricH - cutOffset} L 0 ${cutOffset} Z`} fill="#f4a9a8" className="stroke-page-block" strokeWidth="1.5"/>

            {/* --- Cover Boards --- */}
            <g className="stroke-board-item" strokeWidth="1.5" fill="none" stroke="#22c55e">
                {/* Left Board */}
                <rect x={leftBoardX} y={dims.fabricMargin} width={dims.boardW} height={dims.boardH} rx="2" ry="2"/>
                {/* Right Board */}
                <rect x={rightBoardX} y={dims.fabricMargin} width={dims.boardW} height={dims.boardH} rx="2" ry="2"/>
            </g>

            {/* --- Spine Board Fill (Light yellow) --- */}
            <rect x={spineX + dims.boardT} y={dims.fabricMargin + dims.coverMargin} width={dims.spineW - 2 * dims.boardT} height={dims.boardH - 2 * dims.coverMargin} className="fill-calculated-light"/>
            {/* --- Spine Board Outline (Yellow) --- */}
            <rect x={spineX} y={dims.fabricMargin} width={dims.spineW} height={dims.boardH} fill="none" stroke="#eab308" strokeWidth="1.5" />
            

            {/* --- Page Blocks (Light Gray) --- */}
            <rect x={pageLeftX} y={pageTopY} width={dims.pageW-dims.blockT/2} height={dims.pageH} className="fill-page-light"/>
            <rect x={pageRightX} y={pageTopY} width={dims.pageW-dims.blockT/2} height={dims.pageH} className="fill-page-light"/>

            {/* --- Page Dimensions --- */}
            <g className="stroke-page-block fill-page-block">
                {/* Page Height (h) */}
                <line x1={pageLeftX + dims.pageW/2} y1={pageTopY} x2={pageLeftX + dims.pageW/2} y2={pageTopY + dims.pageH} markerStart="url(#arrow)" markerEnd="url(#arrow)"/>
                <text x={pageLeftX + dims.pageW/2 + 10} y={pageTopY + dims.pageH/2} className="label text-page-block" transform={`rotate(-90, ${pageLeftX + dims.pageW/2}, ${pageTopY + dims.pageH/2})`}>h</text>

                {/* Page Width (w) */}
                <line x1={pageRightX} y1={pageTopY + dims.pageH/2} x2={pageRightX + dims.pageW} y2={pageTopY + dims.pageH/2} markerStart="url(#arrow)" markerEnd="url(#arrow)"/>
                <text x={pageRightX + dims.pageW/2} y={pageTopY + dims.pageH/2 - 8} className="label text-page-block">w</text>
            </g>

            {/* --- Margin Dimensions --- */}
            <g className="stroke-margin-item fill-margin-item">
                {/* Cover Margin */}
                <line x1={-5} y1={dims.fabricMargin + dims.boardH/2} x2={leftBoardX} y2={dims.fabricMargin + dims.boardH/2} markerEnd="url(#arrow)"/>
                <text x="-20" y={dims.fabricMargin + dims.boardH/2 + 4} className="label-sm text-margin-item">
                    cover<tspan x="-20" dy="1.2em">margin</tspan>
                </text>

                {/* Fabric Margin */}
                <line x1={dims.fabricW - dims.fabricMargin - dims.boardW/2} y1={dims.fabricMargin + dims.boardH + 5} x2={dims.fabricW - dims.fabricMargin - dims.boardW/2} y2={dims.fabricH} markerEnd="url(#arrow)"/>
                <text x={dims.fabricW - dims.fabricMargin - dims.boardW/2} y={dims.fabricH + 15} className="label-sm text-margin-item">fabric margin</text>
            </g>

            {/* --- Calculated Dimensions --- */}
            <g className="stroke-calculated-item fill-calculated-item">
                {/* Hinge Gutter (g) */}
                <line x1={dims.fabricMargin + dims.boardW} y1={dims.fabricMargin + dims.boardH + 5} x2={dims.fabricMargin + dims.boardW + dims.gutter} y2={dims.fabricMargin + dims.boardH + 5} markerStart="url(#arrow)" markerEnd="url(#arrow)"/><text x={dims.fabricMargin + dims.boardW + dims.gutter / 2} y={dims.fabricMargin + dims.boardH + 18} className="label text-calculated-item">g</text>

                {/* Spine Width (s) */}
                <line x1={spineX} y1={dims.fabricMargin + dims.boardH/2} x2={spineX + dims.spineW} y2={dims.fabricMargin + dims.boardH/2} markerStart="url(#arrow)" markerEnd="url(#arrow)"/>
                <text x={spineX + dims.spineW / 2} y={dims.fabricMargin + dims.boardH/2 - 8} className="label text-calculated-item">s</text>
            </g>

            {/* --- Board Thickness Label --- */}
            <g className="stroke-board-item fill-board-item">
                <line x1={dims.fabricW - dims.fabricMargin} y1={dims.fabricH - dims.fabricMargin} x2={dims.fabricW - dims.fabricMargin + dims.boardT} y2={dims.fabricH - dims.fabricMargin + dims.boardT}/><text x={dims.fabricW - dims.fabricMargin + dims.boardT + 8} y={dims.fabricH - dims.fabricMargin + dims.boardT + 20} className="label-sm text-board-item" textAnchor="start">board th</text>
            </g>
        </svg>
    );
};

// --- Main App Component ---
const App = () => {
    const [inputs, setInputs] = React.useState({
        pageWidth: 150,
        pageHeight: 230,
        blockThickness: 20,
        boardThickness: 2.5,
        coverMargin: 3,
        fabricMargin: 20,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const pageW = inputs.pageWidth;
    const pageH = inputs.pageHeight;
    const blockT = inputs.blockThickness;
    const boardT = inputs.boardThickness;
    const coverMargin = inputs.coverMargin;
    const fabricMargin = inputs.fabricMargin;

    const boardW = pageW - (0.5 * blockT) + coverMargin;
    const boardH = pageH + (2 * coverMargin);
    const spineW = blockT + (2 * boardT);
    const gutter = (blockT / 2) + boardT;
    const fabricW = (2 * boardW) + spineW + (2 * gutter) + (2 * fabricMargin);
    const fabricH = boardH + (2 * fabricMargin);

    const dims = { pageW, pageH, blockT, boardW, boardH, boardT, spineW, gutter, fabricMargin, fabricW, fabricH, coverMargin };

    return (
        <div className="min-h-screen bg-slate-50 p-2 sm:p-4">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">
                        Book Cover Calculator
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">Visual tool for crafting the perfect book cover</p>
                </header>

                {/* Main Layout - Diagrams First, Then Controls */}
                <div className="grid grid-cols-1 gap-3 h-[calc(100vh-110px)]">
                    
                    {/* Top Row: Both Diagrams Side by Side - Most Prominent */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-3/5">
                        
                        {/* Folded Reference Diagram - First */}
                        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
                            <h3 className="text-center font-semibold text-slate-700 mb-3 text-lg">Cross-Sectional Diagram</h3>
                            <div className="flex-grow flex items-center justify-center min-h-0">
                                <img src="Fold diagram.png" alt="Folded book cross-section diagram" className="max-w-full max-h-full object-contain"/>
                            </div>
                        </div>

                        {/* Live Flat Layout - Second */}
                        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
                            <h3 className="text-center font-semibold text-slate-700 mb-3 text-lg">Live Updating Flat Layout</h3>
                            <div className="flex-grow min-h-0">
                                <FlatLayoutSVG dims={dims} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Controls, Results, and Formulas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 h-2/5">
                        
                        {/* Page Block Controls */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-3">Page Block</h2>
                            <div className="space-y-3">
                                <InputField id="pageWidth" label="Width:" value={inputs.pageWidth} onChange={handleInputChange} colorClass="color-page-block" />
                                <InputField id="pageHeight" label="Height:" value={inputs.pageHeight} onChange={handleInputChange} colorClass="color-page-block" />
                                <InputField id="blockThickness" label="Thickness:" value={inputs.blockThickness} onChange={handleInputChange} colorClass="color-page-block" />
                            </div>
                        </div>
                        
                        {/* Materials Controls */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-3">Materials</h2>
                            <div className="space-y-3">
                                <InputField id="boardThickness" label="Board Thick:" value={inputs.boardThickness} onChange={handleInputChange} colorClass="color-board-item" />
                                <InputField id="coverMargin" label="Cover Margin:" value={inputs.coverMargin} onChange={handleInputChange} colorClass="color-margin-item" />
                                <InputField id="fabricMargin" label="Fabric Margin:" value={inputs.fabricMargin} onChange={handleInputChange} colorClass="color-margin-item" />
                            </div>
                        </div>

                        {/* Final Dimensions Results */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-3">Final Dimensions</h2>
                            <div className="space-y-2 text-sm text-slate-700">
                                <p><strong className="text-board-item">Cover Board:</strong> {boardW.toFixed(1)} × {boardH.toFixed(1)} mm</p>
                                <p><strong className="text-calculated-item">Spine (s):</strong> {spineW.toFixed(1)} mm</p>
                                <p><strong className="text-calculated-item">Gutter (g):</strong> {gutter.toFixed(1)} mm</p>
                                <hr className="my-2 border-slate-200" />
                                <p className="font-semibold"><strong>Total Fabric:</strong> {fabricW.toFixed(1)} × {fabricH.toFixed(1)} mm</p>
                            </div>
                        </div>

                        {/* Key Formulas - Compact */}
                        <div className="bg-white rounded-lg shadow-sm p-4 overflow-y-auto">
                            <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-3">Key Formulas</h2>
                            <div className="space-y-2 text-xs">
                                <div className="bg-slate-50 p-2 rounded">
                                    <strong className="text-board-item">Board Width:</strong><br/>
                                    {pageW.toFixed(1)} - 0.5×{blockT.toFixed(1)} + {coverMargin.toFixed(1)} = <strong>{boardW.toFixed(1)}</strong>
                                </div>
                                <div className="bg-slate-50 p-2 rounded">
                                    <strong className="text-calculated-item">Spine:</strong><br/>
                                    {blockT.toFixed(1)} + 2×{boardT.toFixed(1)} = <strong>{spineW.toFixed(1)}</strong>
                                </div>
                                <div className="bg-slate-50 p-2 rounded">
                                    <strong className="text-calculated-item">Gutter:</strong><br/>
                                    {blockT.toFixed(1)}/2 + {boardT.toFixed(1)} = <strong>{gutter.toFixed(1)}</strong>
                                </div>
                                <div className="bg-slate-50 p-2 rounded">
                                    <strong>Fabric Width:</strong><br/>
                                    2×{boardW.toFixed(1)} + {spineW.toFixed(1)} + 2×{gutter.toFixed(1)} + 2×{fabricMargin.toFixed(1)} = <strong>{fabricW.toFixed(1)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
