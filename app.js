const _DEFAULT_ = 'DEFAULT';
const _GRAY_ = 'GRAY';

const _LTRW_ = 612;
const _LTRH_ = 792;

var _wBase = 23;
var _hBase = 17;

var _ttlCol = 25;
var _ttlRow = 45;

var _wTbl = _wBase*_ttlCol;
var _hTbl = _hBase*_ttlRow;

var _oX = (_LTRW_- _wTbl)/2; //offset
var _oY = (_LTRH_ - _hTbl)/2; //offset

var _defaultFontSize = 12;
var _defaultPadding = {
	x: 3,
	y: 0,
}

function _generateFrame(doc, tbl){
	for(var rowIdx in tbl){
		var spans = tbl[rowIdx];
		if(spans.repeat !== undefined){
			for (var i = 0; i < parseInt(spans.repeat); i++) {
				_generateRowFrame(doc, spans, spans.rowStart+i);
			}
		}else{
			_generateRowFrame(doc, spans, spans.rowStart);
		}
	}
}
function _generateRowFrame(doc, spans, rowStart){
	var startX = _oX ;	
	var startY = _oY + rowStart*_hBase;
	spans.colSpans.forEach(function(cSpan,idx){
		var fill = spans.fill ? spans.fill[idx] : 'S';
		var rSpan = spans.rowSpans[idx];
		if(spans.rowSpans[idx] !== 0){
			if( spans.fillColor ){
				_setFillRGBAColor(doc,spans.fillColor[idx]);
			}
			if( spans.drawColor){
				_setFillRGBAColor(doc,spans.drawColor[idx]);
			}
			doc.rect(startX, startY, cSpan*_wBase, rSpan*_hBase, fill);
		}

		startX += cSpan*_wBase;
	});
}
/*
data = {
	rIdx : 
	cIdx :
	text:
	fontSize:
	padding:{
		x:
		y:
	}
}
*/
function _sumCallBack(total, num) {
    return total + num;
}
function _insertText(data, tbl){
	var row = tbl[data.rIdx];
	var fontSize = data.fontSize || _defaultFontSize;
	var padding = data.padding || _defaultPadding;
	var xOffset = row.colSpans.slice(0,data.cIdx);
	var yOffset = data.offset || 0;
	var x = xOffset.length ? _oX+xOffset.reduce(_sumCallBack)*_wBase+ padding.x : _oX+padding.x;
	//
	var y = _oY + (row.rowStart+yOffset)*_hBase+padding.y+fontSize; // use fontSize to offset y
	//
	doc.setFontSize(fontSize);
	doc.text(data.text.toString(),x, y);
}

function _batchInsertText(dataSets,tbl){
	dataSets.forEach(function(data, idx){
		if(!tbl[data.rIdx].repeat){
			_insertText(data,tbl);
		}else{
			_insertText(data,tbl,idx);
		}
		
	});
}
function _setDrawRGBAColor(doc,color){
	if(!color){
		return;
	}
	switch(color.toUpperCase()){
		case _GRAY_:
			doc.setDrawColor(51,51,51);
			break;
		case _DEFAULT_:
		default:
			doc.setDrawColor(0,0,0);
	}
}
function _setFillRGBAColor(doc,color){
	if(!color){
		return;
	}
	switch(color.toUpperCase()){
		case _GRAY_:
			doc.setFillColor(99,99,99);
			break;
		case _DEFAULT_:
		default:
			doc.setFillColor(255,255,255);
	}
}
//
var doc = new jsPDF('p','pt','letter');
//doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);
//Outter Frame
//Header
var tbl = {
	0:{
		rowStart:0,
		colSpans:[17,3.5,4.5],
		rowSpans:[3,1,1],
	},
	1:{
		rowStart:1,
		colSpans:[17,3.5,4.5],
		rowSpans:[0,1,1],
	},
	2:{
		rowStart:2,
		colSpans:[2,6.5,6.5,2,3.5,4.5],
		rowSpans:[0,1,1,0,1,1],
	},
	3:{
		rowStart:3,
		colSpans:[5,12,3.5,4.5],
		rowSpans:[1,1,1,1],
	},
	4:{
		rowStart:4,
		colSpans:[5,12,3.5,4.5],
		rowSpans:[1,1,1,1],
	},
	5:{
		rowStart:5,
		colSpans:[2,6,3,6,3.5,4.5],
		rowSpans:[1,1,1,1,1,1],
	},
	6:{
		rowStart:6,
		colSpans:[5,20],
		rowSpans:[1,1],
	},
	7:{
		rowStart:7,
		colSpans:[25],
		rowSpans:[18.5],
	},
	8:{
		rowStart:25.5,
		colSpans:[4.25,1,1,1,1,1,1,1,1,0.25,4.25,1,1,1,1,1,1,1,1,0.25],
		rowSpans:[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
		fill:['FD',,,,,,,,,,'FD',,,,,,,,,],
		fillColor:[_GRAY_,,,,,,,,,,_GRAY_,,,,,,,,,],
	},
	9:{
		rowStart:26.5,
		colSpans:[4.25,1,1,1,1,1,1,1,1,0.25,4.25,1,1,1,1,1,1,1,1,0.25],
		rowSpans:[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
		repeat: 14,
	},
	10:{
		rowStart:40.5,
		fill:['FD'],
		fillColor:[_GRAY_],
		colSpans:[25],
		rowSpans:[0.25],
	},
	11:{
		rowStart:40.75,
		colSpans:[5,1,1,1,1,1,1,1,3,4,1,4,1],
		rowSpans:[2,1,1,1,1,1,1,1,2,1,1,1,1],
	},
	12:{
		rowStart:41.75,
		colSpans:[5,1,1,1,1,1,1,1,3,4,1,4,1],
		rowSpans:[0,1,1,1,1,1,1,1,0,1,1,1,1],
	},
	13:{
		rowStart:42.75,
		colSpans:[5,1,1,1,1,1,1,1,3,4,1,4,1],
		rowSpans:[2,1,1,1,1,1,1,1,2,1,1,1,1],
	},
	14:{
		rowStart:43.75,
		colSpans:[5,1,1,1,1,1,1,1,5,3,1,3,1],
		rowSpans:[0,1,1,1,1,1,1,1,0,0,0,0,0],
	},
	15:{
		rowStart:44.75,
		fill:['FD'],
		fillColor:[_GRAY_],
		colSpans:[25],
		rowSpans:[0.25],
	},
	100:{
		rowStart: 0,
		colSpans:[_ttlCol],
		rowSpans:[_ttlRow],
	}
}
doc.setLineWidth(1);
_generateFrame(doc, tbl);
//
var titleText = [
	{
		rIdx : 0,
		cIdx : 0,
		text: "Ford Motor Company Production",
		fontSize: 12,
		padding:{
			x: 3 + _wBase*4,
			y: 0,
		}

	},{
		rIdx : 0,
		cIdx : 1,
		text: "Insp Type:",
	},{
		rIdx : 0,
		cIdx : 2,
		text: "Production",
	},{
		rIdx : 1,
		cIdx : 1,
		text: "Audit Date:",
	},{
		rIdx : 2,
		cIdx : 1,
		text: "Red is Mfg Defect",
	},{
		rIdx : 2,
		cIdx : 2,
		text: "Blue is MDI Defect",
	},{
		rIdx : 2,
		cIdx : 4,
		text: "Shift:",
	},{
		rIdx : 3,
		cIdx : 0,
		text: "Part Number:",
	},{
		rIdx : 3,
		cIdx : 2,
		text: "Inspector:",
	},{
		rIdx : 4,
		cIdx : 0,
		text: "Part Name:",
	},{
		rIdx : 4,
		cIdx : 2,
		text: "Entered By:",
	},{
		rIdx : 5,
		cIdx : 0,
		text: "Line:",
	},{
		rIdx : 5,
		cIdx : 2,
		text: "Part Type:",
	},{
		rIdx : 5,
		cIdx : 4,
		text: "Grp Type:",
	},{
		rIdx : 6,
		cIdx : 0,
		text: "Detailed Comment:",
	},{
		rIdx : 8,
		cIdx : 1,
		text: "A",
	},{
		rIdx : 8,
		cIdx : 2,
		text: "B1",
	},{
		rIdx : 8,
		cIdx : 3,
		text: "B2",
	},{
		rIdx : 8,
		cIdx : 4,
		text: "B3",
	},{
		rIdx : 8,
		cIdx : 5,
		text: "C1",
	},{
		rIdx : 8,
		cIdx : 6,
		text: "C2",
	},{
		rIdx : 8,
		cIdx : 7,
		text: "C3",
	},{
		rIdx : 8,
		cIdx : 8,
		text: "Ttl",
	},{
		rIdx : 8,
		cIdx : 11,
		text: "A",
	},{
		rIdx : 8,
		cIdx : 12,
		text: "B1",
	},{
		rIdx : 8,
		cIdx : 13,
		text: "B2",
	},{
		rIdx : 8,
		cIdx : 14,
		text: "B3",
	},{
		rIdx : 8,
		cIdx : 15,
		text: "C1",
	},{
		rIdx : 8,
		cIdx : 16,
		text: "C2",
	},{
		rIdx : 8,
		cIdx : 17,
		text: "C3",
	},{
		rIdx : 8,
		cIdx : 18,
		text: "Ttl",
	},{
		rIdx : 11,
		cIdx : 0,
		text: "Number of Defects:",
		padding:{
			x:3,
			y:_hBase/2,
		}
	},{
		rIdx : 11,
		cIdx : 1,
		text: "A",
	},{
		rIdx : 11,
		cIdx : 2,
		text: "B1",
	},{
		rIdx : 11,
		cIdx : 3,
		text: "B2",
	},{
		rIdx : 11,
		cIdx : 4,
		text: "B3",
	},{
		rIdx : 11,
		cIdx : 5,
		text: "C1",
	},{
		rIdx : 11,
		cIdx : 6,
		text: "C2",
	},{
		rIdx : 11,
		cIdx : 7,
		text: "C3",
	},{
		rIdx : 11,
		cIdx : 8,
		text: "Total:",
		padding:{
			x:3,
			y:_hBase/2,
		}
	},{
		rIdx : 11,
		cIdx : 9,
		text: "Generic Target:",
	},{
		rIdx : 11,
		cIdx : 11,
		text: "Prev Score:",
	},{
		rIdx : 12,
		cIdx : 9,
		text: "MDI:",
	},{
		rIdx : 12,
		cIdx : 11,
		text: "MS Type:",
	},{
		rIdx : 13,
		cIdx : 0,
		text: "Points:",
		padding:{
			x:3,
			y:_hBase/2,
		}
	},{
		rIdx : 13,
		cIdx : 1,
		text: "A",
	},{
		rIdx : 13,
		cIdx : 2,
		text: "B1",
	},{
		rIdx : 13,
		cIdx : 3,
		text: "B2",
	},{
		rIdx : 13,
		cIdx : 4,
		text: "B3",
	},{
		rIdx : 13,
		cIdx : 5,
		text: "C1",
	},{
		rIdx : 13,
		cIdx : 6,
		text: "C2",
	},{
		rIdx : 13,
		cIdx : 7,
		text: "C3",
	},{
		rIdx : 13,
		cIdx : 8,
		text: "Total:",
		padding:{
			x:3,
			y:_hBase/2,
		}
	},{
		rIdx : 13,
		cIdx : 9,
		text: "Generic Target:",
	},{
		rIdx : 13,
		cIdx : 11,
		text: "Prev Score:",
	}
];
_batchInsertText(titleText, tbl);
_batchInsertText(generateHeaderDataText({}), tbl);
_batchInsertText(generateDefectDataText({},tbl), tbl);
//
function generateHeaderDataText(data){   
	//test data    
	data.PlantAbbr = 'BSP'
    data.InspType = 'Production'
    data.ModifiedDate = '7/6/2017'
    data.ShiftNumber = '1'
    data.PartNumber = '1A1A123456789T'
    data.PartName = 'TTT'
    data.ModifiedBy = 'TUser001'
    data.LineCode = 'TEST_LINE_CODE'
    data.PartType = 'Decklid, TG & LG'
    data.GroupType = 'Sub Assembly'
    data.DetailedComment = 'test comments.test comments.test comments.'
	return [{
		rIdx : 1,
		cIdx : 2,
		text: data.ModifiedDate,
	},{
		rIdx : 2,
		cIdx : 5,
		text: data.ShiftNumber,
	},{
		rIdx : 3,
		cIdx : 1,
		text: data.PartNumber,
	},{
		rIdx : 3,
		cIdx : 3,
		text: data.ModifiedBy,
	},{
		rIdx : 4,
		cIdx : 1,
		text: data.PartName,
	},{
		rIdx : 4,
		cIdx : 3,
		text: data.ModifiedBy,
	},{
		rIdx : 5,
		cIdx : 1,
		text: data.LineCode,
	},{
		rIdx : 5,
		cIdx : 3,
		text: data.PartType,
	},{
		rIdx : 5,
		cIdx : 5,
		text: data.GroupType,
	},{
		rIdx : 6,
		cIdx : 1,
		text: data.DetailedComment,
	}];
}
//
function generateDefectDataText(data,tbl){
	data = [{	
				TypeName : 'Buckles',
			    AQty : 1 ,
			    B1Qty : 2,
			    B2Qty : 0,
			    B3Qty : 0,
			    C1Qty : 3,
			    C2Qty : 0,
			    C3Qty : 0 ,
			    TotalCount : 6,
			},{
				TypeName : 'Burrs',
			    AQty : 1 ,
			    B1Qty : 2,
			    B2Qty : 0,
			    B3Qty : 0,
			    C1Qty : 3,
			    C2Qty : 0,
			    C3Qty : 0 ,
			    TotalCount : 6,
			}];
    var retData = [];
    var repeatNum = tbl['9'].repeat;
    var rowStart = tbl['9'].repeat
    for(var i = 0 ; i<repeatNum; i++){
    	var tmpData = data[i]
    	var j = 0;
    	for(var key in tmpData){
    		retData.push({
				rIdx :9, 
				cIdx :j,
				text : tmpData[key] || "",
				offset : i,
			});
			j += 1;
    	}
		tmpData = data[i+repeatNum] || null; 
    	if(tmpData){
    		var j = 10;
			for(var key in tmpData){
	    		retData.push({
					rIdx :9, 
					cIdx :j,
					text : tmpData[key] || "",
					offset : i,
				});
				j += 1;
	    	}
    	}
    }
    return retData;
}

var dataText = [
]
//doc.autoPrint(); 
var iframe = document.getElementById('pdf');
iframe.src = doc.output('datauristring');