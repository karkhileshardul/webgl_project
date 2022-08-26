var GlobalCount=0.5;
var StartScene = 0;

var RED = 0.0;
var GREEN = 0.0;
var BLUE = 0.0;
var ALPHA = 1.0;

var copyVideo=false;

var canvas = null;
var context = null;
var gl = null;

var bFullScreen = false;
var canvas_original_width;
var canvas_original_height;

const WebGLMacros = {
	SSK_ATTRIBUTE_VERTEX:0,
	SSK_ATTRIBUTE_COLOR:1,
	SSK_ATTRIBUTE_NORMAL:2,
	SSK_ATTRIBUTE_TEXTURE0:3,
	SSK_ATTRIBUTE_TEXTURE1:4
};

var vertexShaderObjectForBasic;
var fragmentShaderObjectForBasic;
var shaderProgramObjectForBasic;

var vao_square_center;
var vbo_square_center_position;
var vbo_texture_for_room;

var vao_square_left;
var vbo_square_left_position;
var vao_square_right;
var vbo_square_right_position;
var vao_square_bottom;
var vbo_square_bottom_position;
var vao_square_top;
var vbo_square_top_position;


var square_texture = 0;
var square_texture1 = 0;
var video_as_a_texture;

var uniform_texture0_sampler_for_room_video;
var mvpUniform;
var mvpUniformForRoomForVideo;
var checkImageHeight = 64;
var checkImageWidth = 64;

var checkImage = [];

var perspectiveProjectionMatrix;

var anisotropyExtension = null;  // The object that represents the anisotropic filtering extension.
var anisotropyMax;  // The maximum degree of anisotropy supported by the implementation.
anisotropyMax =16;

var zupdate = -10.0;
var zupdate2 = 0.0;
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || winodow.oRequestAnimationFrame || window.msRequestAnimationFrame;


const video = setupVideo('./videos/PRATIBIMB.mp4');
const video1 = setupVideo('./videos/RTR2017Event.mp4');
const video2 = setupVideo('./videos/basic.mp4');
const video3 = setupVideo('./videos/AstromedicompEvent.mp4');
const video4 = setupVideo('./videos/medical.mp4');

var checkAudio = null;
var audioCheck=0;
	var defaultAudio = null;
	var defaultAudioCheck= 0;
var audioOfSir = null;
var audioOfSirCheck = 0;


var Scene1 = 0;
	var textureCanvasOne = null;
	var txtglone = null; //texture context
	var txxtgltwo = null;
	var textRelatedCubeIndices;
	var textCanvas_original_width;
	var textCanvas_original_height;
	var textureForFontOne = 0;
	var vao_for_font_one;	
	var vbo_for_font_position_one;
	var vbo_for_font_texture_one;
	var vbo_for_font_indices_one;

var Scene2 = 0;
var textureCanvasTwo = null;
	var txxtgltwo = null;
	var vao_for_font_two;	
	var vbo_for_font_position_two;
	var vbo_for_font_texture_two;
	var vbo_for_font_indices_two;
	var textureForFontTwo = 0;

var Scene3 = 0;
var Scene4 = 0;
var Scene5 = 0;
var Scene6 = 0;
var Scene7 = 0;
var Scene8 = 0;
var Scene9 = 0;

var SceneChange =0;




//SJ Part

var vao_sphere;
var vbo_sphere_position;
var vbo_sphere_normal;
var vbo_sphere_texture;
var vbo_sphere_index;
var numElementsForSphere;

var textureForSphere3D;
var modelData;

var u_modelview;       // Locations for uniform matrices
var u_projection;
var u_normalMatrix;
var u_textureNum;
var u_scale;

var samplerUniform;
var scaleUniform;
var fScaleVal = 1.0;
var fScaleValForEarth =1.0;
//SJ Part END

var upVertexShaderObject;
var upFragmentShaderObject;
var upShaderProgramObject;

var sphere=null;

var perspectiveProjectionMatrix;
var upModelMatrixUniform;
var upViewMatrixUniform;
var upProjectionUniform;
var ldUniform;
var kdUniform;
var laUniform;
var kaUniform;
var lsUniform;
var ksUniform;
var materialShininessUniform;
var isLKeyPressedUniform;
var lightPositionUniform;
var colorTextureUniform;
var planetTextureUniform;
var yellow_texture;
var sun_Texture;
var earth_Texture;
var moon_Texture;
var light_ambient = new Float32Array([ 0.0, 0.0, 0.0]);

var light_diffuse = new Float32Array([ 1.0, 0.0, 0.0]);

var light_specular = new Float32Array([1.0, 1.0, 0.0]);
var light_position = new Float32Array([0.0, 0.0, 0.0, 1.0 ]);
var material_ambient = new Float32Array([ 0.0, 0.0, 0.0]);
var material_diffuse = new Float32Array ([1.0, 0.0,0.0]);
var material_specular = new Float32Array([1.0, 1.0, 0.0]);
var material_shininess = 0.01;//Check this with 128.0f as well

var frameBuffer;
var fbTexture;
var fbTextureOne;
var fbTextureTwo;

//Quad SHADER : Start
var quadVertexShaderObject;
var quadFragmnetShaderObject;
var quadShaderProgramObject;
var quadmodelMatrixUniform;
var quadviewMatrixUniform;
var quadprojectionUniform;
var quadTextureUniform;
var quadPixelSizeUniform;
var vao_cube;
var vbo_pos_cube;
var vbo_tex_cube;

//Quad SHADER :END

//BLUR SHADER : Start
var blurVertexShaderObject;
var blurFragmnetShaderObject;
var blurShaderProgramObject;
var blurTextureUniform;
var blurPixelSizeUniform;
var blurIsVerticalUniform;

var blurmodelMatrixUniform;
var blurviewMatrixUniform;
var blurprojectionUniform;
//BLUR SHADER :END

//brightLight shader:Start
var brightLightVertexShaderObject;
var brightLightFragmnetShaderObject;
var brightLightShaderProgramObject;
var brightLightTextureUniform;
var brightLightPixelSizeUniform;
var brightLightIsVerticalUniform;

var brightLightrmodelMatrixUniform;
var brightLightlurviewMatrixUniform;
var brightLightprojectionUniform;


//brightLight shader:End

//BLOOM SHADER:Start
var bloomVertexShaderObject;
var bloomFragmnetShaderObject;
var bloomShaderProgramObject;
var bloomTextureUniform1;
var bloomTextureUniform2;
var bloomPixelSizeUniform;
var bloomIsVerticalUniform;
    
var bloomrmodelMatrixUniform;
var bloomlurviewMatrixUniform;
var bloomprojectionUniform;
var bloomControlFlagUniform;

var bloomldUniform;
var bloomkdUniform;
var bloomlaUniform;
var bloomkaUniform;
var bloomlsUniform;
var bloomksUniform;
var bloommaterialShininessUniform;
var bloomisLKeyPressedUniform;
var bloomlightPositionUniform;
//BLOOM SHADER:END

var sunTranslation = -5.0;



// UP Part START
var rotationForEarth=0.0;
var rotationForMoon=0.0;
var moonTranslation = -1.2;
var lightVariance = 0.0;
// UP Part END


var squareVertices;
var square1Vertices;
var square2Vertices;
var square3Vertices;



// Room Part

var vao_head;
var vbo_head;

var vao_ground;
var vbo_ground_position;

var vao_cube_room;//
var vbo_cube_position_room;//

var vao_sidepanels;
var vbo_cube_sidepanels_pos;

var vao_sidepanels_aside;
var vbo_cube_sidepanels_pos_aside;

var vao_front_top_triangle;
var vbo_front_top_traingle_pos;

var vao_back_top_triangle;
var vbo_back_top_triangle_pos;

var vao_leftRect;
var vbo_leftRect;

var vao_rightRect;
var vbo_rightRect;

var mvpUniformRoom;
var colorUniformRoom;
var textureFlagUniformRoom;
var samplerUniformRoom;

// added to add noise texture
var textureForRoom;
var angle = 0.0;

var cameraPosition;
var cameraFront;
var cameraUp;


//Ap part




var vao_earth_sphere;
var vbo_earth_sphere_position;
var vbo_earth_sphere_normal;
var vbo_earth_sphere_texture;
var vbo_earth_sphere_index;

var modelData_Earth;
var earth_TextureNew;


var vertexShaderObjectForComputer;
var fragmentShaderObjectForComputer;
var shaderProgramObjectForComputer;

var vao_computer;
var vao_hal;
var vbo_position_for_computer;
var vbo_texture_for_computer;
var mvpUniformForComputer;

var vao_earth_sphere;
var vbo_position_for_earth_sphere;
var vbo_texture_for_earth_sphere;

var computer_texture = 0;
var hal_texture = 0;
var uniform_texture0_sampler_computer;

var goingIntoIndia = -8.0;
var flagThis=0;




var knowledge_update = -3.0;
var is_update = -2.58;
var interelated_update = 3.0;
var viramix_update =2.8;





var xGoingInsideEarth  = 0.0;
var zGoingInsideEarth = 0.0;


function main()
{
	canvas = document.getElementById("AMC");
	if(!canvas){
		console.log("Obtaining Canvas Failed \n");
	}else{
		console.log("Obtaining Canvas Success \n");
	}

 	textureCanvasOne = document.getElementById("TEXT");
	if (!textureCanvasOne)
    	console.log("Obtaining Text Canvas Failed\n");
    else
    	console.log("Obtaining Text Canvas Succeeded\n");


	canvas_original_height = canvas.height;
	canvas_original_width = canvas.width;

	textCanvas_original_width = textureCanvasOne.width;
	textCanvas_original_height = textureCanvasOne.height;


	textureCanvasTwo = document.getElementById("TEXT");
	if (!textureCanvasTwo)
    	console.log("Obtaining Text Canvas Failed\n");
    else
    	console.log("Obtaining Text Canvas Succeeded\n");

	textCanvas_original_width = textureCanvasTwo.width;
	textCanvas_original_height = textureCanvasTwo.height;

	window.addEventListener("keydown",keyDownFunction,false);
	window.addEventListener("click",mouseDownFunction,false);
	window.addEventListener("resize",resize,false);
	init();
	resize();
	doAnisotropy();
	doAnisotropyFor3D();
	draw();
}


function doAnisotropyFor3D() 
{
    if ( ! anisotropyExtension ) 
    {
        return;
    }
    if (document.getElementById("useAF").checked) 
    {
        gl.texParameteri(gl.TEXTURE_3D, anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, anisotropyMax); 
    }
    else 
    {
        gl.texParameteri(gl.TEXTURE_3D, anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, 1); 
    }
}

function doAnisotropy() 
{
    if ( ! anisotropyExtension ) 
    {
        return;
    }
    if (document.getElementById("useAF").checked) 
    {
        gl.texParameteri(gl.TEXTURE_2D, anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, anisotropyMax); 
    }
    else 
    {
        gl.texParameteri(gl.TEXTURE_2D, anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, 1); 
    }
}

function toggleFullScreen(){
	var fullScreen_Element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	if(fullScreen_Element == null)
	{
		if(canvas.requestFullscreen)
			canvas.requestFullscreen();
		else if(canvas.mozRequestFullScreen)
			canvas.mozRequestFullScreen();
		else if(canvas.webkitRequestFullscreen)
			canvas.webkitRequestFullscreen();
		else if(canvas.msRequestFullscreen)
			canvas.msRequestFullscreen();
		bFullScreen = true;
	}else{
		if(document.exitFullscreen)
			document.exitFullscreen();
		else if(document.mozCancelFullScreen)
			document.mozCancelFullScreen();
		else if(document.webkitExitFullscreen)
			document.webkitExitFullscreen();
		else if(document.msExitFullscreen)
			document.msExitFullscreen
		bFullScreen = false;
	}
}

function init(){
	gl = canvas.getContext("webgl2");
	if(gl == null){
		console.log("Failed to get rendering context  for webgl");
		return;
	}else{
		console.log("Succeed to get rendering context  for webgl");
	}
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;


	var vertexShaderSourceCodeForBasic=
	"#version 300 es"+
	"\n"+
	"in vec4 vPosition;"+
	"in vec2 vTexture0_Coord_For_Room;"+
	"out vec2 out_texture0_coord;"+
	"uniform mat4 u_mvp_matrix;"+
	"void main(void)"+
	"{"+
		"gl_Position = u_mvp_matrix * vPosition;"+
		"out_texture0_coord = vTexture0_Coord_For_Room;"+
	"}";


	vertexShaderObjectForBasic = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShaderObjectForBasic ,vertexShaderSourceCodeForBasic);
	gl.compileShader(vertexShaderObjectForBasic);
	if(gl.getShaderParameter(vertexShaderObjectForBasic,gl.COMPILE_STATUS)==false){
		var error = gl.getShaderInfoLog(vertexShaderObjectForBasic);
		if(error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}

	var fragmentShaderSourceCodeForBasic =
	"#version 300 es"+
	"\n"+
	"precision highp float;"+
	"in vec2 out_texture0_coord;"+
	"uniform highp sampler2D u_texture0_sampler_for_room;"+
	"out vec4 frag_color;"+
	"void main(void)"+
	"{"+
	"frag_color = texture(u_texture0_sampler_for_room,out_texture0_coord);"+
	"}";

	fragmentShaderObjectForBasic = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShaderObjectForBasic ,fragmentShaderSourceCodeForBasic);
	gl.compileShader(fragmentShaderObjectForBasic);
	if(gl.getShaderParameter(fragmentShaderObjectForBasic,gl.COMPILE_STATUS)==false){
		var error = gl.getShaderInfoLog(fragmentShaderObjectForBasic);
		if(error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}

	shaderProgramObjectForBasic = gl.createProgram();
	gl.attachShader(shaderProgramObjectForBasic,vertexShaderObjectForBasic);
	gl.attachShader(shaderProgramObjectForBasic,fragmentShaderObjectForBasic);


	gl.bindAttribLocation(shaderProgramObjectForBasic,WebGLMacros.SSK_ATTRIBUTE_VERTEX,"vPosition");
	gl.bindAttribLocation(shaderProgramObjectForBasic,WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,"vTexture0_Coord_For_Room");


	gl.linkProgram(shaderProgramObjectForBasic);
	if(!gl.getProgramParameter(shaderProgramObjectForBasic,gl.LINK_STATUS)){
		var error = gl.getProgramInfoLog(shaderProgramObjectForBasic);
		if(error.length > 0){
			alert(error);
			uninitialize();
		}
	}


// SJ Part START


 var vertexShaderSourceCodeFor3DNoise =
    "#version 300 es"+
    "\n" +
    "in vec4 vPosition;" +
    "in vec3 vNormal;" +
    "in vec2 vTexCooard; " +

    "uniform mat4 u_model_view_matrix;" +
    "uniform mat4 u_projection_matrix;" +

    "out vec3 vNormalizedNormals;" +
    "out vec3 vobjectCoordinates;" +
    "out vec3 vEyeCoords;" +
    "out vec2 vTexCoords;" +

    "out vec3 vMCPosition;" +

    "uniform float u_Scale;" +
    "void main(void)" +
    "{" +
        "vec4 eyeCoords;" +
        "vec4 vTempPos = vPosition;" +

        "vTempPos.x += u_Scale;" +
        "vTempPos.y += u_Scale;" +
        "vTempPos.z += u_Scale;" +

        "eyeCoords = u_model_view_matrix * vPosition;" +
        "gl_Position = u_projection_matrix * eyeCoords;" +
        "vNormalizedNormals = normalize(vNormal);" +
        "vobjectCoordinates = vPosition.xyz;" +
        "vEyeCoords = eyeCoords.xyz / eyeCoords.w;" +
        "vTexCoords = vTexCooard;" +

        "vMCPosition = vTempPos.xyz;" +
    "}";

    vertexShaderObjectFor3DNoise = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObjectFor3DNoise, vertexShaderSourceCodeFor3DNoise);
    gl.compileShader(vertexShaderObjectFor3DNoise);
    if(gl.getShaderParameter(vertexShaderObjectFor3DNoise, gl.COMPILE_STATUS) == false)
    {
        var error = gl.getShaderInfoLog(vertexShaderObjectFor3DNoise);
        if(error.length > 0)
        {
            alert(error);
            uninitialize();
        }
    }

    
    var fragmentShaderSourceCodeFor3DNoise =
    "#version 300 es"+
    "\n" +
    "precision highp float;" +

    "in vec3 vMCPosition;" +
    "out vec4 vFragColor;" +
    "uniform  highp sampler3D u_Noise;" +

    "void main(void)" +
    "{" +

        "vec4 noisevec;" +
        "float intensity;" +
        "vec3 color ;" +
   		"vec3 color1= vec3(0.8, 0.7, 0.0);"  +
        "vec3 color2= vec3(0.6, 0.1, 0.0);"  +
        "float NoiseScale = 1.2;"  +

        "noisevec = texture(u_Noise, vMCPosition);" +

        "intensity = " +
        "abs(noisevec[0] - 0.25) +" +
        "abs(noisevec[1] - 0.125) +" +
        "abs(noisevec[2] - 0.0625) +" +
        "abs(noisevec[3] - 0.03125);" +

        "intensity = clamp(intensity * 6.0, 0.0, 1.0);" +
        "color = mix(color1, color2 , intensity);" +


        "vFragColor = vec4(color, 1.0);" +
    "}"

    fragmentShaderObjectFor3DNoise = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObjectFor3DNoise, fragmentShaderSourceCodeFor3DNoise);
    gl.compileShader(fragmentShaderObjectFor3DNoise);
    if(false == gl.getShaderParameter(fragmentShaderObjectFor3DNoise, gl.COMPILE_STATUS))
    {
        var error = gl.getShaderInfoLog(fragmentShaderObjectFor3DNoise);
        if(error.length > 0)
        {
            alert(error);
            uninitialize();
        }
    }

   
    shaderProgramObjectFor3DNoise = gl.createProgram();
    gl.attachShader(shaderProgramObjectFor3DNoise, vertexShaderObjectFor3DNoise);
    gl.attachShader(shaderProgramObjectFor3DNoise, fragmentShaderObjectFor3DNoise);

    gl.bindAttribLocation(shaderProgramObjectFor3DNoise, WebGLMacros.SSK_ATTRIBUTE_VERTEX, "vPosition");
    gl.bindAttribLocation(shaderProgramObjectFor3DNoise, WebGLMacros.SSK_ATTRIBUTE_NORMAL, "vNormal");
    gl.bindAttribLocation(shaderProgramObjectFor3DNoise, WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, "vTexCooard");

   
    gl.linkProgram(shaderProgramObjectFor3DNoise);
    if(!gl.getProgramParameter((shaderProgramObjectFor3DNoise), gl.LINK_STATUS))
    {
        var error = gl.getProgramInfoLog(fragmentShaderObjectFor3DNoise);
        if(error.length > 0)
        {
            alert(error);
            uninitialize();
        }
    }


  	mvpUniform = gl.getUniformLocation(shaderProgramObjectFor3DNoise, "u_mvp_matrix");
    samplerUniform = gl.getUniformLocation(shaderProgramObjectFor3DNoise, "u_Noise");
    scaleUniform = gl.getUniformLocation(shaderProgramObjectFor3DNoise, "u_Scale");

    u_modelview = gl.getUniformLocation(shaderProgramObjectFor3DNoise, "u_model_view_matrix");
    u_projection = gl.getUniformLocation(shaderProgramObjectFor3DNoise, "u_projection_matrix");





    modelData = uvSphere(2.0,64,32);

    numElementsForSphere = modelData.indicesForSphere.length;
    vao_sphere = gl.createVertexArray();
    gl.bindVertexArray(vao_sphere);

    // vbo for position
    vbo_sphere_position = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo_sphere_position);
    gl.bufferData(gl.ARRAY_BUFFER,modelData.vertexPositionsForSphere, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,
                           3,
                           gl.FLOAT,
                           false,0,0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    // vbo for normals
    vbo_sphere_normal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo_sphere_normal);
    gl.bufferData(gl.ARRAY_BUFFER,
                modelData.vertexNormalsForSphere,
                gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_NORMAL,
                           3,
                           gl.FLOAT,
                           false,0,0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_NORMAL);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    // vbo for texture
    vbo_sphere_texture=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo_sphere_texture);
    gl.bufferData(gl.ARRAY_BUFFER,
                modelData.vertexTextureCoordsForSphere,
                gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,
                           2, // 2 is for S,T co-ordinates in our texCoords array
                           gl.FLOAT,
                           false,0,0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    // vbo for index
    vbo_sphere_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                modelData.indicesForSphere,
                gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    gl.bindVertexArray(null);


    getTexture();


// SJ Part End


// UP Part START

var vertexShaderSourceCode = "#version 300 es"+
								"\n"+
								" in vec4 vPosition; " +
		" in vec3 vNormal;"	+
		"in vec2 vTexCoord;"+
		"out vec2 out_textcoord;"+
		"out vec3 phong_ads_light;" +
		"out vec3 light_direction;" +
		"out vec3 tnorm;" +
		"out vec3 viewer_vector;" +
		"uniform mediump int u_islkeypressed;" +
		"uniform mat4 u_viewmatrix;" +
		"uniform mat4 u_modelmatrix;" +
		"uniform mat4 u_projection;" +
		"uniform vec4 u_light_position;"+
		" void main(void)" +
		"{" +
		"if (u_islkeypressed == 1)"+
		"{" +
		"out_textcoord = vTexCoord;"+
		"vec4 eye_coordinates = u_viewmatrix*u_modelmatrix*vPosition;" +
		"mat3 normalmatrix = mat3(transpose(inverse(u_viewmatrix*u_modelmatrix)));" +
		"tnorm = (normalmatrix*vNormal);" +
		"light_direction = (vec3(u_light_position - eye_coordinates));" +
		"viewer_vector = (vec3(-eye_coordinates.xyz));" +
		"}"+
		" gl_Position = u_projection*u_viewmatrix*u_modelmatrix*vPosition; " +
		"}";
	upVertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(upVertexShaderObject, vertexShaderSourceCode);
	gl.compileShader(upVertexShaderObject);
	if (gl.getShaderParameter(upVertexShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(upVertexShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}
	
	//Fragment shader
	var fragmentShaderSourceCode = "#version 300 es"+
		"\n"+
		"precision highp float;"+
		"out vec4 FragColor;" +
		"uniform int u_islkeypressed;" +
		"in vec3 light_direction;" +
		"in vec3 viewer_vector;" +
		"in vec3 tnorm;" +
		"in vec2 out_textcoord;"+
		"uniform vec3 u_kd;" +
		"uniform vec3 u_ld;" +
		"uniform vec3 u_la;" +
		"uniform vec3 u_ka;" +
		"uniform vec3 u_ls;" +
		"uniform vec3 u_ks;" +
		"uniform float u_materialshininess;" +
		"vec3 phong_ads_light;" +
		"uniform sampler2D u_texture;"+
		"void main(void)" +
		"{" +
			"if (u_islkeypressed == 1)"+
			"{"+
				"vec3 normalized_light_direction = normalize(light_direction);" +
				"vec3 normalized_viewer_vector = normalize(viewer_vector);" +
				"vec3 normalizedtnorm = normalize(tnorm);" +
				"float tndotld = max(dot(normalized_light_direction, normalizedtnorm), 0.0);" +
				"vec3 reflectionvector =  reflect(-normalized_light_direction, normalizedtnorm);" +
				"vec3 ambient = u_la*u_ka;" +
				"vec3 diffuse = u_ld*u_kd*tndotld;" +
				"vec3 specular = u_ls*u_ks*pow(max(dot(reflectionvector, normalized_viewer_vector), 0.0), u_materialshininess);" +
				"vec4 texColor = texture(u_texture, out_textcoord);"+
				
				"vec3 phong_ads_light = ambient+diffuse*vec3(texColor)+specular;" +
				"FragColor = vec4(phong_ads_light, 1.0) ;" +				
			"}"+
			"else"+
			"{"+
				"FragColor = vec4(1.0, 1.0, 1.0, 1.0);" +
			"}"+
		"}";

	upFragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(upFragmentShaderObject, fragmentShaderSourceCode);
	gl.compileShader(upFragmentShaderObject);
	if (gl.getShaderParameter(upFragmentShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(upFragmentShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}
	
	//Shader program
	upShaderProgramObject = gl.createProgram();
	gl.attachShader(upShaderProgramObject, upVertexShaderObject);
	gl.attachShader(upShaderProgramObject, upFragmentShaderObject);
	
	//pre-link binding of shader program object with vertex shader attributes
	gl.bindAttribLocation(upShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_VERTEX, "vPosition");
	gl.bindAttribLocation(upShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_NORMAL, "vNormal");
	gl.bindAttribLocation(upShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, "vTexCoord");
	
	//Linking
	gl.linkProgram(upShaderProgramObject);
	if (gl.getProgramParameter(upShaderProgramObject, gl.LINK_STATUS) == false)
	{
		var error = gl.getProgramInfoLog(upShaderProgramObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();			
		}
	}
	//GEt mvp uniform location		
	upViewMatrixUniform = gl.getUniformLocation(upShaderProgramObject, "u_viewmatrix");
	upModelMatrixUniform = gl.getUniformLocation(upShaderProgramObject, "u_modelmatrix");
	upProjectionUniform = gl.getUniformLocation(upShaderProgramObject, "u_projection");
	ldUniform = gl.getUniformLocation(upShaderProgramObject, "u_ld");
	kdUniform = gl.getUniformLocation(upShaderProgramObject, "u_kd");
	laUniform = gl.getUniformLocation(upShaderProgramObject, "u_la");
	kaUniform = gl.getUniformLocation(upShaderProgramObject, "u_ka");
	lsUniform = gl.getUniformLocation(upShaderProgramObject, "u_ls");
	ksUniform = gl.getUniformLocation(upShaderProgramObject, "u_ks");
	materialShininessUniform = gl.getUniformLocation(upShaderProgramObject, "u_materialshininess");
	isLKeyPressedUniform = gl.getUniformLocation(upShaderProgramObject, "u_islkeypressed");
	lightPositionUniform = gl.getUniformLocation(upShaderProgramObject, "u_light_position");
	colorTextureUniform = gl.getUniformLocation(upShaderProgramObject, "u_texture");
	sun_Texture = gl.createTexture();
	sun_Texture.image = new Image();
	sun_Texture.image.src = "sun.png";
	sun_Texture.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, sun_Texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sun_Texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);		
	}

//##############################BLUR SHADERS###############:START
var blurVertexShaderSourceCode = "#version 300 es"+
								"\n"+
								" in vec4 vPosition; " +
								"in vec2 vTexCoord;"+
								"out vec2 outTextCoord;"+
								"uniform mat4 u_quadmodelMatrix;"+
								"uniform mat4 u_quadviewMatrix;"+
								"uniform mat4 u_quadprojectionMatrix;"+
								"void main(void)"+
								"{"+
									"outTextCoord = vTexCoord;"+
									"gl_Position=vPosition;"+									
								"}";
	blurVertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(blurVertexShaderObject, blurVertexShaderSourceCode);
	gl.compileShader(blurVertexShaderObject);
	if (gl.getShaderParameter(blurVertexShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(blurVertexShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}



	var blurFragmentShaderSourceCode = "#version 300 es"+
		"\n"+
		"precision highp float;"+
			"uniform vec2 u_pixelSize;"+
								"uniform sampler2D u_texture;"+
								"uniform int u_isVertical;"+
								"out vec4 FragColor;"+
								"void main()"+
								"{"+
									"vec2 pos=gl_FragCoord.xy*u_pixelSize;"+
									"float values[11];"+
									"values[0]=0.05;"+
									"values[1]=0.09;"+
									"values[2]=0.11;"+
									"values[3]=0.15;"+
									"values[4]=0.2;"+
									"values[5]=0.15;"+
									"values[6]=0.11;"+
									"values[7]=0.09;"+
									"values[8]=0.05;"+									
									"values[9]=0.01;"+
									"values[10]=0.01;"+
									"vec4 result;"+
									"if(u_isVertical==1)"+
									"{"+
										"vec2 curSamplePos=vec2(pos.x,pos.y-5.0*u_pixelSize.y);"+
										"for(int i=0;i<9;i++)"+
										"{"+
											"result+=texture(u_texture,curSamplePos)*values[i];"+
											"curSamplePos.y+=u_pixelSize.y*2.0;"+
											
										"}"+
									"}else{"+
										"vec2 curSamplePos=vec2(pos.x-5.0*u_pixelSize.x,pos.y);"+
										"for(int i=0;i<9;i++)"+
										"{"+
											"result+=texture(u_texture,curSamplePos)*values[i];"+
											"curSamplePos.x+=u_pixelSize.x*2.0;"+											
										"}"+		
									"}"	+
									"FragColor=vec4(result.rgb, 1.0);"+
								"}";	
	
	blurFragmnetShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(blurFragmnetShaderObject, blurFragmentShaderSourceCode);
	gl.compileShader(blurFragmnetShaderObject);
	if (gl.getShaderParameter(blurFragmnetShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(blurFragmnetShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}
	
	//Shader program
	blurShaderProgramObject = gl.createProgram();
	gl.attachShader(blurShaderProgramObject, blurVertexShaderObject);
	gl.attachShader(blurShaderProgramObject, blurFragmnetShaderObject);
	
	//pre-link binding of shader program object with vertex shader attributes
	gl.bindAttribLocation(blurShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_VERTEX, "vPosition");
	gl.bindAttribLocation(blurShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, "vTexCoord");
	
	//Linking
	gl.linkProgram(blurShaderProgramObject);
	if (gl.getProgramParameter(blurShaderProgramObject, gl.LINK_STATUS) == false)
	{
		var error = gl.getProgramInfoLog(blurShaderProgramObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();			
		}
	}
	//GEt mvp uniform location
	blurviewMatrixUniform = gl.getUniformLocation(blurShaderProgramObject, "u_quadviewMatrix");
	blurmodelMatrixUniform = gl.getUniformLocation(blurShaderProgramObject, "u_quadmodelMatrix");
	blurprojectionUniform = gl.getUniformLocation(blurShaderProgramObject, "u_quadprojectionMatrix");
	
	blurTextureUniform = gl.getUniformLocation(blurShaderProgramObject, "u_texture");
	blurPixelSizeUniform = gl.getUniformLocation(blurShaderProgramObject, "u_pixelSize");
	blurIsVerticalUniform = gl.getUniformLocation(blurShaderProgramObject, "u_isVertical");



//***********************BRIGHTLIGHT SHADER:START***********
var brightLightVertexShaderSourceCode = "#version 300 es"+
								"\n"+
								" in vec4 vPosition; " +
								"in vec2 vTexCoord;"+
								"out vec2 outTextCoord;"+								
								"uniform mat4 u_quadmodelMatrix;"+
								"uniform mat4 u_quadviewMatrix;"+
								"uniform mat4 u_quadprojectionMatrix;"+
								"void main(void)"+
								"{"+
									"outTextCoord = vTexCoord;"+
									"gl_Position= u_quadprojectionMatrix*u_quadviewMatrix*u_quadmodelMatrix*vPosition;"+									
								"}";
	brightLightVertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(brightLightVertexShaderObject, brightLightVertexShaderSourceCode);
	gl.compileShader(brightLightVertexShaderObject);
	if (gl.getShaderParameter(brightLightVertexShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(brightLightVertexShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}
	
	
	var brightLightFragmentShaderSourceCode = "#version 300 es"+
											"\n"+
											"precision highp float;"+
											"uniform vec2 u_pixelSize;"+
											"uniform sampler2D u_texture;"+								
											"out vec4 FragColor;"+									
											"void main()"+
											"{"+
												"vec2 pos=gl_FragCoord.xy*u_pixelSize;"+								
												"float intensity = dot(texture(u_texture, pos).xyz, vec3(0.333, 0.333, 0.333));"+
												"if (intensity>0.5)"+
												"{"+
													"FragColor=vec4(1.0, 1.0, 1.0, 1.0);"+
												"}"+
												"else"+
												"{"+
													"FragColor=vec4(0.0, 0.0, 0.0, 1.0);"+
												"}"+												
											"}";	
	
	brightLightFragmnetShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(brightLightFragmnetShaderObject, brightLightFragmentShaderSourceCode);
	gl.compileShader(brightLightFragmnetShaderObject);
	if (gl.getShaderParameter(brightLightFragmnetShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(brightLightFragmnetShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}
	
	//Shader program
	brightLightShaderProgramObject = gl.createProgram();
	gl.attachShader(brightLightShaderProgramObject, brightLightVertexShaderObject);
	gl.attachShader(brightLightShaderProgramObject, brightLightFragmnetShaderObject);
	
	//pre-link binding of shader program object with vertex shader attributes
	gl.bindAttribLocation(brightLightShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_VERTEX, "vPosition");
	gl.bindAttribLocation(brightLightShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, "vTexCoord");
	
	//Linking
	gl.linkProgram(brightLightShaderProgramObject);
	if (gl.getProgramParameter(brightLightShaderProgramObject, gl.LINK_STATUS) == false)
	{
		var error = gl.getProgramInfoLog(brightLightShaderProgramObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();			
		}
	}
	//GEt mvp uniform location
	brightLightviewMatrixUniform = gl.getUniformLocation(brightLightShaderProgramObject, "u_quadviewMatrix");
	brightLightmodelMatrixUniform = gl.getUniformLocation(brightLightShaderProgramObject, "u_quadmodelMatrix");
	brightLightprojectionUniform = gl.getUniformLocation(brightLightShaderProgramObject, "u_quadprojectionMatrix");
	
	brightLightTextureUniform = gl.getUniformLocation(brightLightShaderProgramObject, "u_texture");
	brightLightPixelSizeUniform = gl.getUniformLocation(brightLightShaderProgramObject, "u_pixelSize");
		
//*********************************BRIGHTLIGHT :END
	


//***********************BLOOM SHADER:START***********
var bloomVertexShaderSourceCode = "#version 300 es"+
								"\n"+
								" in vec4 vPosition; " +
								"in vec2 vTexCoord;"+
								"out vec2 outTextCoord;"+
								" in vec3 vNormal;"	+
								"uniform mat4 u_quadmodelMatrix;"+
								"uniform mat4 u_quadviewMatrix;"+
								"uniform mat4 u_quadprojectionMatrix;"+
								"uniform mediump int u_bloomControlFlag;"+								
								"out vec3 phong_ads_light;" +
								"out vec3 light_direction;" +
								"out vec3 tnorm;" +
								"out vec3 viewer_vector;" +
								"uniform mediump int u_islkeypressed;" +
								"uniform vec4 u_light_position;"+								
								"void main(void)"+
								"{"+
									"outTextCoord = vTexCoord;"+
									"if(u_bloomControlFlag == 1)"+
									"{"+
									"gl_Position= vPosition;"+
									"}"+
									"else"+
									"{"+
										"vec4 eye_coordinates = u_quadviewMatrix*u_quadmodelMatrix*vPosition;" +
										"mat3 normalmatrix = mat3(transpose(inverse(u_quadviewMatrix*u_quadmodelMatrix)));" +
										"tnorm = (normalmatrix*vNormal);" +
										"light_direction = (vec3(u_light_position - eye_coordinates));" +
										"viewer_vector = (vec3(-eye_coordinates.xyz));" +
										"gl_Position=u_quadprojectionMatrix*u_quadviewMatrix*u_quadmodelMatrix*vPosition;"+
									"}"+
								"}";
	bloomVertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(bloomVertexShaderObject, bloomVertexShaderSourceCode);
	gl.compileShader(bloomVertexShaderObject);
	if (gl.getShaderParameter(bloomVertexShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(bloomVertexShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}
	
	
	var bloomFragmentShaderSourceCode = "#version 300 es"+
											"\n"+
											"precision highp float;"+
											"uniform vec2 u_pixelSize;"+
											"uniform sampler2D u_textureone;"+
											"in vec2 outTextCoord;"+
											"uniform sampler2D u_textureotwo;"+
											"uniform sampler2D u_texture;"+
											"out vec4 FragColor;"+
											"uniform int u_bloomControlFlag;"+
											"uniform int u_islkeypressed;" +
											"in vec3 light_direction;" +
											"in vec3 viewer_vector;" +
											"in vec3 tnorm;" +											
											"uniform vec3 u_kd;" +
											"uniform vec3 u_ld;" +
											"uniform vec3 u_la;" +
											"uniform vec3 u_ka;" +
											"uniform vec3 u_ls;" +
											"uniform vec3 u_ks;" +
											"uniform float u_materialshininess;" +
											"vec3 phong_ads_light;" +
											"void main()"+
											"{"+
												"if(u_bloomControlFlag == 1)"+
												"{"+
													"vec2 pos=gl_FragCoord.xy*u_pixelSize;"+								
													"FragColor=vec4(texture(u_textureone, pos).rgb +texture(u_textureotwo, pos).rgb, 1.0);"+
												"}"+
												"else"+
												"{"+
													"if (u_islkeypressed==1)"+
													"{"+
													"vec3 normalized_light_direction = normalize(light_direction);" +
													"vec3 normalized_viewer_vector = normalize(viewer_vector);" +
													"vec3 normalizedtnorm = normalize(tnorm);" +
													"float tndotld = max(dot(normalized_light_direction, normalizedtnorm), 0.0);" +
													"vec3 reflectionvector =  reflect(-normalized_light_direction, normalizedtnorm);" +
													"vec3 ambient = u_la*u_ka;" +
													"vec3 diffuse = u_ld*u_kd*tndotld;" +
													"vec3 specular = u_ls*u_ks*pow(max(dot(reflectionvector, normalized_viewer_vector), 0.0), u_materialshininess);" +
													"vec4 texColor = texture(u_texture, outTextCoord);"+												
													"vec3 phong_ads_light = ambient*vec3(texColor)+diffuse*vec3(texColor)+specular*vec3(texColor);" +
													"FragColor = vec4(phong_ads_light, 1.0) ;" +
													"}"+
													"else if (u_islkeypressed==2)"+
													"{"+
													"FragColor=texture(u_texture, outTextCoord);"+
													"}"+
													"else"+
													"{"+
													"FragColor=vec4(0.0,0.0,0.0,1.0);"+
													"}"+
												"}"+
											"}";	
	
	bloomFragmnetShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(bloomFragmnetShaderObject, bloomFragmentShaderSourceCode);
	gl.compileShader(bloomFragmnetShaderObject);
	if (gl.getShaderParameter(bloomFragmnetShaderObject, gl.COMPILE_STATUS)==false)
	{
		var error = gl.getShaderInfoLog(bloomFragmnetShaderObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}
	
	//Shader program
	bloomShaderProgramObject = gl.createProgram();
	gl.attachShader(bloomShaderProgramObject, bloomVertexShaderObject);
	gl.attachShader(bloomShaderProgramObject, bloomFragmnetShaderObject);
	
	//pre-link binding of shader program object with vertex shader attributes
	gl.bindAttribLocation(bloomShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_VERTEX, "vPosition");
	gl.bindAttribLocation(bloomShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, "vTexCoord");
	gl.bindAttribLocation(bloomShaderProgramObject, WebGLMacros.SSK_ATTRIBUTE_NORMAL, "vNormal");
	
	//Linking
	gl.linkProgram(bloomShaderProgramObject);
	if (gl.getProgramParameter(bloomShaderProgramObject, gl.LINK_STATUS) == false)
	{
		var error = gl.getProgramInfoLog(bloomShaderProgramObject);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();			
		}
	}
	//GEt mvp uniform location
	bloomviewMatrixUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_quadviewMatrix");
	bloommodelMatrixUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_quadmodelMatrix");
	bloomprojectionUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_quadprojectionMatrix");
	
	bloomTextureUniform1 = gl.getUniformLocation(bloomShaderProgramObject, "u_textureone");
	bloomTextureUniform2 = gl.getUniformLocation(bloomShaderProgramObject, "u_texturetwo");
	bloomPixelSizeUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_pixelSize");
	bloomControlFlagUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_bloomControlFlag");
	planetTextureUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_texture");	
	bloomldUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_ld");
	bloomkdUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_kd");
	bloomlaUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_la");
	bloomkaUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_ka");
	bloomlsUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_ls");
	bloomksUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_ks");
	bloommaterialShininessUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_materialshininess");
	bloomisLKeyPressedUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_islkeypressed");
	bloomlightPositionUniform = gl.getUniformLocation(bloomShaderProgramObject, "u_light_position");
	
	
	earth_Texture = gl.createTexture();
	earth_Texture.image = new Image();
	earth_Texture.image.src = "earthnight.png";//TODO : REPLACE THIS WITH EARTH TEXTURE
	earth_Texture.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, earth_Texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, earth_Texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);		
	}
	
	moon_Texture = gl.createTexture();
	moon_Texture.image = new Image();
	moon_Texture.image.src = "moon.png";//TODO:REPLACE THIS WITH MOON TEXTURE
	moon_Texture.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, moon_Texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, moon_Texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);		
	}
	
//*********************************BLOOM :END

/*	sphere = new Mesh();
	makeSphere(sphere, 2.0, 30, 30);
*/	
	uvSphere(2.0,30,30);
	var cubeVertices = new Float32Array([1.0, 1.0, -1.0,
									-1.0, 1.0, -1.0,
									-1.0, 1.0, 1.0,
									1.0, 1.0, 1.0,
									
									1.0, -1.0, 1.0,
									-1.0, -1.0,1.0,
									-1.0, -1.0,-1.0,
									1.0, -1.0, -1.0,
									
									1.0, 1.0, 1.0,
									-1.0, 1.0, 1.0,
									-1.0, -1.0, 1.0,
									1.0, -1.0, 1.0,
									
									1.0, -1.0, -1.0,
									-1.0, -1.0, -1.0,
									-1.0, 1.0, -1.0,
									1.0, 1.0, -1.0,
									
									-1.0, 1.0, 1.0,
									-1.0, 1.0, -1.0,
									-1.0, -1.0, -1.0,
									-1.0, -1.0, 1.0,
									
									1.0, 1.0, -1.0,
									1.0, 1.0, 1.0,
									1.0, -1.0, 1.0,
									1.0, -1.0, -1.0]);									
			
        var cubeTextureCoord = new Float32Array([0.0, 1.0,
										0.0, 0.0,
										1.0, 0.0,
										1.0, 1.0,

										0.0, 0.0,
										1.0, 0.0,
										1.0, 1.0,
										0.0, 1.0,

										0.0, 0.0,
										1.0, 0.0,
										1.0, 1.0,
										0.0, 1.0,

										0.0, 0.0,
										1.0, 0.0,
										1.0, 1.0,
										0.0, 1.0,

										1.0, 0.0,
										0.0, 0.0,
										0.0, 1.0,
										1.0, 1.0,

										0.0, 0.0,
										1.0, 0.0,
										1.0, 1.0,
										0.0, 1.0]);
	
	vao_cube = gl.createVertexArray();
	gl.bindVertexArray(vao_cube);
	
	
	vbo_pos_cube = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_pos_cube);
	gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);	
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	vbo_tex_cube = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_tex_cube);
	gl.bufferData(gl.ARRAY_BUFFER, cubeTextureCoord, gl.STATIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.bindVertexArray(null);
	//FRAME BUFFER CHANGES:START
	frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	fbTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fbTexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 800, 600, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbTexture, 0);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
	fbTextureOne = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fbTextureOne);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 800, 600, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	//gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbTextureOne, 0);
    gl.bindTexture(gl.TEXTURE_2D, null);


	fbTextureTwo = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fbTextureTwo);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 800, 600, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
	
	if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE)
	{
		console.log("***********FRAMEBUFFER IS NOT COMPLETE*********");
	}
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	



//UP Part END


















	makeCheckImage();
	video_as_a_texture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D,video_as_a_texture);
  	
  		anisotropyExtension = gl.getExtension("EXT_texture_filter_anisotropic");
        if ( ! anisotropyExtension ) {
            document.getElementById("useAF").disabled = true;
            document.getElementById("useAF").checked = false;           
        }
        else {
            anisotropyMax = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        }
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);		
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,checkImage);
	 	//gl.generateMipmap(gl.TEXTURE_2D);
		//gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);  		
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
   		doAnisotropy();


	makeCheckImage();
	square_texture = gl.createTexture();

		gl.bindTexture(gl.TEXTURE_2D,square_texture);

  		anisotropyExtension = gl.getExtension("EXT_texture_filter_anisotropic");
        if ( ! anisotropyExtension ) {
            document.getElementById("useAF").disabled = true;
            document.getElementById("useAF").checked = false;           
        }
        else {
            anisotropyMax = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        }

		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.LUMINANCE,checkImageWidth,checkImageHeight,0,gl.LUMINANCE,gl.UNSIGNED_BYTE,checkImage);
	 	gl.generateMipmap(gl.TEXTURE_2D);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
   		doAnisotropy();

	mvpUniformForRoomForVideo = gl.getUniformLocation(shaderProgramObjectForBasic,"u_mvp_matrix");

var squareVerticesForTheRoomCenter = new Float32Array([
		
		 3.72,-1.0,-3.05,
		 3.72,4.5,-3.05,
		 -3.9,4.5,-3.05,
		-3.9,-1.0,-3.05
	]);

	var squareVerticesForTheRoomLeft = new Float32Array([		
		-0.3,-1.0,-3.07,
		-0.3,4.5,-3.07,
		-0.7,4.5,0.0,
		-0.7,-1.0,0.0
	]);

	var squareVerticesForTheRoomRight = new Float32Array([
		3.0,-1.0,0.0,
		3.0,4.5,0.0,
		2.8,4.5,-3.01421,
		2.8,-1.0,-3.01421
	]);


	var squareVerticesForTheRoomTop = new Float32Array([
		-4.02,-1.0,0.0,
		-3.6,-1.0,-3.5,		
		3.7,-1.0,-3.5,
		3.9,-1.0,0.0

	]);

	var squareVerticesForTheRoomBottom = new Float32Array([
		3.9,-1.0,0.0,
		3.7,-1.0,-3.1,		
		-3.7,-1.0,-3.1,
		-4.06,-1.0,0.0
	]);


	vao_square_center = gl.createVertexArray();
	gl.bindVertexArray(vao_square_center);

	vbo_square_center_position = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_square_center_position);
	gl.bufferData(gl.ARRAY_BUFFER,squareVerticesForTheRoomCenter,gl.STATIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);

	vbo_texture_for_room = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
	gl.bufferData(gl.ARRAY_BUFFER,4*2*64,gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	gl.bindVertexArray(null);

	vao_square_left = gl.createVertexArray();
	gl.bindVertexArray(vao_square_left);

	vbo_square_left_position = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_square_left_position);
	gl.bufferData(gl.ARRAY_BUFFER,squareVerticesForTheRoomLeft,gl.STATIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);

	//vbo_texture_for_room = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
	gl.bufferData(gl.ARRAY_BUFFER,4*2*64,gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	gl.bindVertexArray(null);


	vao_square_right = gl.createVertexArray();
	gl.bindVertexArray(vao_square_right);

	vbo_square_right_position = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_square_right_position);
	gl.bufferData(gl.ARRAY_BUFFER,squareVerticesForTheRoomRight,gl.STATIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);

	//vbo_texture_for_room = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
	gl.bufferData(gl.ARRAY_BUFFER,4*2*64,gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	gl.bindVertexArray(null);



	vao_square_bottom = gl.createVertexArray();
	gl.bindVertexArray(vao_square_bottom);

	vbo_square_bottom_position = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_square_bottom_position);
	gl.bufferData(gl.ARRAY_BUFFER,squareVerticesForTheRoomBottom,gl.STATIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);

	//vbo_texture_for_room = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
	gl.bufferData(gl.ARRAY_BUFFER,4*2*64,gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	gl.bindVertexArray(null);


	vao_square_top = gl.createVertexArray();
	gl.bindVertexArray(vao_square_top);

	vbo_square_top_position = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_square_top_position);
	gl.bufferData(gl.ARRAY_BUFFER,squareVerticesForTheRoomTop,gl.STATIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);

	//vbo_texture_for_room = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
	gl.bufferData(gl.ARRAY_BUFFER,4*2*64,gl.DYNAMIC_DRAW);
	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	gl.bindVertexArray(null);

   	textureForFontOne = gl.createTexture();
   	gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
	anisotropyExtension = gl.getExtension("EXT_texture_filter_anisotropic");
    if ( ! anisotropyExtension ) {
    	document.getElementById("TEXT").disabled = true;
        document.getElementById("TEXT").checked = false;           
    }
    else {
        anisotropyMax = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	doAnisotropy();

		var textRelatedVertices = new Float32Array([ //front surface
		                                 -1.0, -1.0, 1.0,
		                                  1.0, -1.0, 1.0,
		                                  1.0, 1.0, 1.0,
		                                  -1.0, 1.0, 1.0]);


		for (var i = 0; i < 72; i++)
		{
			if (textRelatedVertices[i] < 0.0)
				textRelatedVertices[i] = textRelatedVertices[i] + 0.1;
			else if (textRelatedVertices[i] > 0.0)
		     	textRelatedVertices[i] = textRelatedVertices[i] - 0.1;
		 	else
			 	textRelatedVertices[i] = textRelatedVertices[i]; //no change
		}

		var textRelatedTexCoords = new Float32Array([ 0.0, 0.0,
	                                       1.0, 0.0,
	                                       1.0, 1.0,  
	                                       0.0, 1.0]);

    	textRelatedCubeIndices = new Uint16Array([ 0, 1, 2,
                                    0, 2, 3,]);



		vao_for_font_one = gl.createVertexArray();
		gl.bindVertexArray(vao_for_font_one);

		vbo_for_font_position_one = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo_for_font_position_one);
    	gl.bufferData(gl.ARRAY_BUFFER, textRelatedVertices, gl.STATIC_DRAW);
    	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	    vbo_for_font_texture_one = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_for_font_texture_one);
	    gl.bufferData(gl.ARRAY_BUFFER, textRelatedTexCoords, gl.STATIC_DRAW);
	    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, 2, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    	vbo_for_font_indices_one = gl.createBuffer();
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_one );
    	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, textRelatedCubeIndices, gl.STATIC_DRAW);
    	gl.bindVertexArray(null);
  



  		textureForFontTwo = gl.createTexture();
    	gl.bindTexture(gl.TEXTURE_2D, textureForFontTwo);
  		anisotropyExtension = gl.getExtension("EXT_texture_filter_anisotropic");
        if ( ! anisotropyExtension ) {
            document.getElementById("TEXT").disabled = true;
            document.getElementById("TEXT").checked = false;           
        }
        else {
            anisotropyMax = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        }

    	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasTwo);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

		doAnisotropy();

		vao_for_font_two = gl.createVertexArray();
		gl.bindVertexArray(vao_for_font_two);

		vbo_for_font_position_two = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo_for_font_position_two);
    	gl.bufferData(gl.ARRAY_BUFFER, textRelatedVertices, gl.STATIC_DRAW);
    	gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    	gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	    vbo_for_font_texture_two = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_for_font_texture_two);
	    gl.bufferData(gl.ARRAY_BUFFER, textRelatedTexCoords, gl.STATIC_DRAW);
	    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, 2, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    	vbo_for_font_indices_two = gl.createBuffer();
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_two);
    	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, textRelatedCubeIndices, gl.STATIC_DRAW);
    	gl.bindVertexArray(null);
  

/*SJ Part */

//Room ___START__
var vertexShaderSourceCode =
    "#version 300 es"+
    "\n" +
    "in vec4 vPosition;" +
    "out vec3 vobjectCoordinates;" +
    "uniform mat4 u_mvp_matrix_room;" +
    "void main(void)" +
    "{" +
    "gl_Position = u_mvp_matrix_room * vPosition;" +
    "vobjectCoordinates = vPosition.xyz;" +
    "}";


 vertexShaderObjectRoom = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObjectRoom, vertexShaderSourceCode);
    gl.compileShader(vertexShaderObjectRoom);
    if(gl.getShaderParameter(vertexShaderObjectRoom, gl.COMPILE_STATUS) == false)
    {
        var error = gl.getShaderInfoLog(vertexShaderObjectRoom);
        if(error.length > 0)
        {
            alert(error);
            uninitialize();
        }
    }






     var fragmentShaderSourceCode =
    "#version 300 es"+
    "\n" +
    "precision highp float;" +
    "uniform vec4 u_color_room;" +
    "out vec4 vFragColor;" +
    "uniform int texture_flag_room;" +

    // added before adding marble to the texture
    "uniform  highp sampler3D u_Noise_room;" +

    "in vec3 vobjectCoordinates;" +

    "vec3 get_marble()" +
    "{" +
        "vec4 noisevec;" +
        "float intensity;" +
        "vec3 color;" +
        "float sineval;" +

        "vec3 MarbleColor = vec3(1.0, 1.0, 1.0);" +
        "vec3 VeinColor = vec3(0.0, 0.0, 0.0);" +

        "noisevec = texture(u_Noise_room, vobjectCoordinates);" +

        "intensity = " +
        "abs(noisevec[0] - 0.25) +" +
        "abs(noisevec[1] - 0.125) +" +
        "abs(noisevec[2] - 0.0625) +" +
        "abs(noisevec[3] - 0.03125);" +

        "intensity = clamp(intensity * 6.0, 0.0, 1.0);" +
        "sineval = sin(vobjectCoordinates.y * 5.0 + intensity * 12.0) * 0.5 + 0.5;" +
        "color = mix(MarbleColor, VeinColor, sineval);" +
        "return color;" +
    "}" +

    "vec3 get_brick()" +
    "{" +
        "vec3 color;" +
        "vec3 brick_color = vec3(1.0, 0.3, 0.2);" +
        "vec3 morter_color = vec3(0.85, 0.86, 0.84);" +
        "vec2 brick_size = vec2(0.30, 0.15);" +
        "vec2 brick_pct = vec2(0.90, 0.85);" +
        "vec2 position, useBrick;" +

        "position = vobjectCoordinates.xy / brick_size;" +
        "if (fract(position.y * 0.5) > 0.5)" +
        "{" +
        "position.x += 0.5;" +
        "}" +

        "position = fract(position);" +
        "useBrick = step(position, brick_pct);" +
        "color = mix(morter_color, brick_color, useBrick.x * useBrick.y);" +
        "return color;" +
    "}" +

    "void main(void)" +
    "{" +
        "vec3 N;" +
        "vec3 L;" +
        "vec3 color;" +
        "float diffusedVector;" +

        "if(texture_flag_room == 0)" +
        "{" +
            "color = u_color_room.xyz;" +
        "}" +
        "else if(texture_flag_room == 1)" +
        "{" +
        "color = get_brick();" +
        "}" +
        "else if(texture_flag_room == 2){" +
            "color = get_marble();" +
        "}" +

        "vFragColor = vec4(color, 1.0);" +
    "}"


  fragmentShaderObjectRoom = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObjectRoom, fragmentShaderSourceCode);
    gl.compileShader(fragmentShaderObjectRoom);
    if(false == gl.getShaderParameter(fragmentShaderObjectRoom, gl.COMPILE_STATUS))
    {
        var error = gl.getShaderInfoLog(fragmentShaderObjectRoom);
        if(error.length > 0)
        {
            alert(error);
            uninitialize();
        }
    }

   // shader program
    shaderProgramObjectRoom = gl.createProgram();
    gl.attachShader(shaderProgramObjectRoom, vertexShaderObjectRoom);
    gl.attachShader(shaderProgramObjectRoom, fragmentShaderObjectRoom);

    gl.bindAttribLocation(shaderProgramObjectRoom, WebGLMacros.SSK_ATTRIBUTE_VERTEX, "vPosition");

    // linking
    gl.linkProgram(shaderProgramObjectRoom);
    if(!gl.getProgramParameter((shaderProgramObjectRoom), gl.LINK_STATUS))
    {
        var error = gl.getProgramInfoLog(fragmentShaderObjectRoom);
        if(error.length > 0)
        {
            alert(error);
            uninitialize();
        }
    }




      // get MVP uniform location
    mvpUniformRoom = gl.getUniformLocation(shaderProgramObjectRoom, "u_mvp_matrix_room");
    colorUniformRoom = gl.getUniformLocation(shaderProgramObjectRoom, "u_color_room");
    textureFlagUniformRoom = gl.getUniformLocation(shaderProgramObjectRoom, "texture_flag_room");
    // following sampler is added to get noise  texture
    samplerUniformRoom = gl.getUniformLocation(shaderProgramObjectRoom, "u_Noise_room");

    var groundVertices = new Float32Array([
                                            9.0,  -3.0, -4.8,
                                            -9.0, -3.0, -4.8,
                                            -9.0, -3.0, 9.0,
                                            9.0,  -3.0, 9.0,
                                        ]);

    vao_ground = gl.createVertexArray();
    gl.bindVertexArray(vao_ground);

    vbo_ground_position = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_ground_position);
    gl.bufferData(gl.ARRAY_BUFFER, groundVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);

    var cubeVertices_1_room = new
     Float32Array([
             7.0,  1.0, -7.0,
			-7.0,  1.0, -7.0,
			-7.0,  1.0,  7.0,
             7.0,  1.0,  7.0,

			 7.0, -3.0, -7.0,
			-7.0, -3.0, -7.0,
			-7.0, -3.0,  7.0,
             7.0, -3.0,  7.0,

			 -0.5,  1.0,  7.0,
			-7.0,  1.0,  7.0,
			-7.0, -3.0,  7.0,
             -0.5, -3.0,  7.0,

			 7.0,  1.0, -7.0,
			-7.0,  1.0, -7.0,
			-7.0, -3.0, -7.0,
             7.0, -3.0, -7.0,

			 7.0,  1.0, -7.0,
			 7.0,  1.0,  7.0,
			 7.0, -3.0,  7.0,
             7.0, -3.0, -7.0,

			-7.0,  1.0, -7.0,
			-7.0,  1.0,  7.0,
			-7.0, -3.0,  7.0,
            -7.0, -3.0, -7.0,
            
            7.0,  1.0,  7.0,
			0.5,  1.0,  7.0,
			0.5, -3.0,  7.0,
             7.0, -3.0,  7.0
        ]);

    vao_cube_room = gl.createVertexArray();
    gl.bindVertexArray(vao_cube_room);
    
    vbo_cube_position_room = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_cube_position_room);
    gl.bufferData(gl.ARRAY_BUFFER, cubeVertices_1_room, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,
        3,
        gl.FLOAT,
        false,
        0,
        0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);

    var side_panels = new Float32Array([
                    7.2,  1.0, -7.2,
                    7.0,  1.2, -7.0,
                    7.0,  1.2,  7.0,
                    7.2,  1.0,  7.0]);

    vao_sidepanels = gl.createVertexArray();
    gl.bindVertexArray(vao_sidepanels);
    vbo_cube_sidepanels_pos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_cube_sidepanels_pos);
    gl.bufferData(gl.ARRAY_BUFFER, side_panels, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);

    var frontTopTriangle = new Float32Array([
                    7.2, 1.0, 7.0,
                    0.0,   1.8, 7.0,
                    -7.2, 1.0, 7.0
                ]);

    vao_front_top_triangle = gl.createVertexArray();
    gl.bindVertexArray(vao_front_top_triangle);

    vbo_front_top_traingle_pos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_front_top_traingle_pos);
    gl.bufferData(gl.ARRAY_BUFFER, frontTopTriangle, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null);

    var backTopTriangle = new Float32Array([
                    7.2, 1.0, -7.0,
                    0,   1.8, -7.0,
                    -7.2, 1.0, -7.0
                ])

    vao_back_top_triangle = gl.createVertexArray();
    gl.bindVertexArray(vao_back_top_triangle);

    vbo_back_top_triangle_pos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_back_top_triangle_pos);
    gl.bufferData(gl.ARRAY_BUFFER, backTopTriangle, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null);

    var leftRect = new Float32Array([
        0.0,  1.8,  -7.0,
        -7.2, 1.0, -7.0,
        -7.2, 1.0, 7.0,
        0.0,  1.8, 7.0
    ]);

    vao_leftRect = gl.createVertexArray();
    gl.bindVertexArray(vao_leftRect);

    vbo_leftRect = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_leftRect);
    gl.bufferData(gl.ARRAY_BUFFER, leftRect, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null);

    var rightRect = new Float32Array([
  		 
         7.2, 1.0,  -7.0,
         0.0,  1.8,  -7.0,
		 0.0,  1.8,   7.0,
         7.2, 1.0,   7.0
        
    ]);

    vao_rightRect = gl.createVertexArray();
    gl.bindVertexArray(vao_rightRect);

    vbo_rightRect = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_rightRect);
    gl.bufferData(gl.ARRAY_BUFFER, rightRect, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null);

    var head= new Float32Array([
        -0.5,  1.0,  7.0,
        -0.5, -1.0,  7.0,
        0.5,  -1.0,  7.0,
        0.5,  1.0,  7.0
   ]);

   vao_head = gl.createVertexArray();
   gl.bindVertexArray(vao_head);

   vbo_head = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vbo_head);
   gl.bufferData(gl.ARRAY_BUFFER, head, gl.STATIC_DRAW);
   gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
   gl.bindBuffer(gl.ARRAY_BUFFER, null);

   gl.bindVertexArray(null);

   vbo_rightRect = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vbo_rightRect);
   gl.bufferData(gl.ARRAY_BUFFER, rightRect, gl.STATIC_DRAW);
   gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
   gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // setting texture
    getTextureForRoomMarble();
    cameraPosition = vec3.create();
    cameraFront = vec3.create();
    cameraUp = vec3.create();

    vec3.set(cameraPosition, 0.0, 3.0, 5.5); // 
    vec3.set(cameraFront, 0.0, 0.0, -0.01);
    vec3.set(cameraUp, 0.0, 1.0, 0.0);

//Room ___END___



//Ap __START__
var vertexShaderSourceCodeForComputer=
	"#version 300 es" +
	"\n" +
	"in vec4 vPosition;" +
	"in vec2 vTexture0_Coord;" +
	"out vec2 out_texture0_coord;" +
	"uniform mat4 u_mvp_matrix;" +
	"void main(void)" +
	"{" +
	"gl_Position = u_mvp_matrix * vPosition;" +
	"out_texture0_coord = vTexture0_Coord;" +
	"}";

	vertexShaderObjectForComputer = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShaderObjectForComputer, vertexShaderSourceCodeForComputer);
	gl.compileShader(vertexShaderObjectForComputer);
	if(gl.getShaderParameter(vertexShaderObjectForComputer, gl.COMPILE_STATUS)==false)
	{
		var error=gl.getShaderInfoLog(vertexShaderObjectForComputer);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}

	//fragment shader
	var fragmentShaderSourceCodeForComputer=
	"#version 300 es" +
	"\n" +
	"precision highp float;" +
	"in vec2 out_texture0_coord;" +
	"uniform highp sampler2D u_texture0_sampler;" +
	"out vec4 FragColor;" +
	"void main(void)" +
	"{" +
	"FragColor = texture(u_texture0_sampler, out_texture0_coord);" +
	"}"

	fragmentShaderObjectForComputer = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShaderObjectForComputer, fragmentShaderSourceCodeForComputer);
	gl.compileShader(fragmentShaderObjectForComputer);
	if (gl.getShaderParameter(fragmentShaderObjectForComputer, gl.COMPILE_STATUS)==false)
	{
		var error=gl.getShaderInfoLog(fragmentShaderObjectForComputer);
		if (error.length > 0)
		{
			alert(error);
			uninitialize();
		}
	}

	//shader program
	shaderProgramObjectForComputer = gl.createProgram();
	gl.attachShader(shaderProgramObjectForComputer, vertexShaderObjectForComputer);
	gl.attachShader(shaderProgramObjectForComputer, fragmentShaderObjectForComputer);

	//pre-link binding of shader program object with vertex shader attributes 
	gl.bindAttribLocation(shaderProgramObjectForComputer, WebGLMacros.SSK_ATTRIBUTE_VERTEX, "vPosition");

    gl.bindAttribLocation(shaderProgramObjectForComputer, WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, "vTexture0_Coord");

	//linking
	gl.linkProgram(shaderProgramObjectForComputer);
	if (!gl.getProgramParameter(shaderProgramObjectForComputer, gl.LINK_STATUS))
	{
	   var error = gl.getProgramInfoLog(shaderProgramObjectForComputer);
	   if (error.length > 0)
	   {
	   	 alert(error);
	   	 uninitialize();
	   }
	}


	//Load Computer Textures
	computer_texture = gl.createTexture();
	computer_texture.image = new Image();
	computer_texture.image.src="Computer1.png";
	computer_texture.image.onload = function()
	{
		gl.bindTexture(gl.TEXTURE_2D, computer_texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, computer_texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	//Load Hal Textures
	hal_texture = gl.createTexture();
	hal_texture.image = new Image();
	hal_texture.image.src="hal.png";
	hal_texture.image.onload = function()
	{
		gl.bindTexture(gl.TEXTURE_2D, hal_texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, hal_texture.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}


	//get MVP uniform location
	mvpUniformForComputer = gl.getUniformLocation(shaderProgramObjectForComputer, "u_mvp_matrix");

	uniform_texture0_samler = gl.getUniformLocation(shaderProgramObjectForComputer, "u_texture0_sampler");

    //cube vertices for computer
	var computerVertices = new Float32Array([ //front surface
		                                  1.0, 1.0, 1.0,
		                                  -1.0, 1.0, 1.0,
		                                  -1.0, -1.0, 1.0,
		                                  1.0, -1.0, 1.0]);

    //cube texcoords for computer
	var computerTexcoords = new Float32Array([ 0.0, 0.0,
	                                       1.0, 0.0,
	                                       1.0, 1.0,  
	                                       0.0, 1.0]);

	//cube vertices for hal
	var halVertices = new Float32Array([ //front surface
		                                  1.0, 1.0, 1.0,
		                                  -1.0, 1.0, 1.0,
		                                  -1.0, -1.0, 1.0,
		                                  1.0, -1.0, 1.0]);

    //cube texcoords for hal
	var halTexcoords = new Float32Array([ 0.0, 0.0,
	                                       1.0, 0.0,
	                                       1.0, 1.0,  
	                                       0.0, 1.0]);
 
 

    //Computer
	vao_computer = gl.createVertexArray();
	gl.bindVertexArray(vao_computer);

	vbo_position_for_computer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_position_for_computer);
    gl.bufferData(gl.ARRAY_BUFFER, computerVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    vbo_texture_for_computer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_texture_for_computer);
    gl.bufferData(gl.ARRAY_BUFFER, computerTexcoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null);


    //Hal Eye
	vao_hal = gl.createVertexArray();
	gl.bindVertexArray(vao_hal);

	vbo_position_for_computer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo_position_for_computer);
    gl.bufferData(gl.ARRAY_BUFFER, halVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    vbo_texture_for_computer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_texture_for_computer);
    gl.bufferData(gl.ARRAY_BUFFER, halTexcoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null);





    modelData_Earth = uvSphere(2.0,64,32);

    numElementsForSphereEarth = modelData_Earth.indicesForSphere.length;
    vao_earth_sphere = gl.createVertexArray();
    gl.bindVertexArray(vao_earth_sphere);

    // vbo for position
    vbo_earth_sphere_position = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo_earth_sphere_position);
    gl.bufferData(gl.ARRAY_BUFFER,modelData_Earth.vertexPositionsForSphere, gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_VERTEX,
                           3,
                           gl.FLOAT,
                           false,0,0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_VERTEX);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    // vbo for normals
    vbo_earth_sphere_normal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo_earth_sphere_normal);
    gl.bufferData(gl.ARRAY_BUFFER,
                modelData_Earth.vertexNormalsForSphere,
                gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_NORMAL,
                           3,
                           gl.FLOAT,
                           false,0,0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_NORMAL);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    
    vbo_earth_sphere_texture=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo_earth_sphere_texture);
    gl.bufferData(gl.ARRAY_BUFFER,
                modelData_Earth.vertexTextureCoordsForSphere,
                gl.STATIC_DRAW);
    gl.vertexAttribPointer(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0,
                           2, 
                           gl.FLOAT,
                           false,0,0);
    gl.enableVertexAttribArray(WebGLMacros.SSK_ATTRIBUTE_TEXTURE0);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    // vbo for index
    vbo_earth_sphere_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_earth_sphere_index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                modelData_Earth.indicesForSphere,
                gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    gl.bindVertexArray(null);

	earth_TextureNew = gl.createTexture();
	earth_TextureNew.image = new Image();
	earth_TextureNew.image.src = "earthdaymap.png";
	earth_TextureNew.image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, earth_TextureNew);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, earth_TextureNew.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);		
	}


//AP ___END___


/*Audio Part*/

		checkAudio = new Audio('./audios/dholki.mp3');
		defaultAudio = new Audio('./audios/beachhouse.mp3');
		audioOfSir = new Audio('./audios/SirAudioTempoChange.mp3');

	gl.enable(gl.DEPTH_TEST);

	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.depthFunc(gl.LEQUAL);
//	gl.clearColor(1.0,0.0,0.0,1.0);
	gl.clearColor(RED,GREEN,BLUE,ALPHA);

	perspectiveProjectionMatrix = mat4.create();
}

function makeCheckImage(){
	var i,j,c=0 ;
	var cnt = 0;
	checkImage = new Uint8Array(64 * 64 * 4);
	for(i=0;i<checkImageHeight;i++){
		for(j=0;j<checkImageWidth;j++){
			var c = (((i&0x8)==0) ^ ((j&0x8)==0)) * 255;
			
			checkImage[i*checkImageWidth +j + 0] = c;
			checkImage[i*checkImageWidth +j + 1] = c;
			checkImage[i*checkImageWidth +j + 2] = c;
			checkImage[i*checkImageWidth +j + 3] = 255;
		}
	}
}

function resize(){
	if(bFullScreen == true){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}else{
		canvas.width = canvas_original_width;
		canvas.height = canvas_original_height;
	}
	gl.viewport(0,0,canvas.width,canvas.height);

	mat4.perspective(perspectiveProjectionMatrix,45.0,parseFloat(canvas.width)/parseFloat(canvas.height),0.1,100.0);
}


function draw(){
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	
	var modelViewMatrix = mat4.create();
	var modelViewProjectionMatrix  = mat4.create();
	var myModelMatrix = mat4.create();
	var tempMatrix = mat4.create();
	

if(StartScene == 1)
{
	GlobalCount = GlobalCount + 0.003;
	if(GlobalCount > 1.0 && GlobalCount < 2.0)
	{
		//1
		Scene1 = 1;		
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;

	}
	else if(GlobalCount > 2.0 && GlobalCount < 2.3)
	{
		Scene1 = 0;		
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 1;
	}
	else if(GlobalCount > 2.3 && GlobalCount < 4.9)
	{
		//4
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 1;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	
	else if( GlobalCount > 4.9 && GlobalCount < 5.8)
	{
		//2
		Scene2 = 1;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(GlobalCount> 5.8 &&  GlobalCount < 8.8)
	{
		//3
		Scene2 = 0;		
		Scene3 = 1;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(zupdate >= -3.2 && GlobalCount > 8.3 && GlobalCount < 9.0 )
	{
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 1;
	}
	else if(GlobalCount > 9.0 && GlobalCount < 9.9)
	{
		//5
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 1;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(zGoingInsideEarth >= 3.8  && GlobalCount > 9.9 && GlobalCount < 13.4)
	{
		//6
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 1;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(cameraPosition[2] >= -3.5 && GlobalCount > 13.4 && GlobalCount < 14.7)
	{
		//7
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 1;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if( GlobalCount > 14.7 && GlobalCount < 15.3)
	{
		//8
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 1;
		Scene9 = 0;
		SceneChange = 0;
	}/*
	else if(GlobalCount >13.4 )
	{
		window.close();

	}
	*/
}
/*
	if(GlobalCount > 1.0 && GlobalCount < 2.0)
	{
		//1
		Scene1 = 1;		
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;

	}
	else if(GlobalCount > 2.0 && GlobalCount < 2.5)
	{
		Scene1 = 0;		
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 1;
	}
	else if(GlobalCount > 2.5 && GlobalCount < 3.5)
	{
		//2
		Scene2 = 1;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(GlobalCount > 3.5 && GlobalCount < 4.0)
	{
		Scene1 = 0;		
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 1;

	}else if(zupdate  <= -3.2 && GlobalCount> 4.0 &&  GlobalCount < 8.0)
//	}else if(GlobalCount > 4.0 && GlobalCount < 5.0)
	{
		//3
		Scene2 = 0;		
		Scene3 = 1;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(zupdate >= -3.2 && GlobalCount > 8.0 && GlobalCount < 8.5 )
	{
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 1;
	}
	else if( zupdate > -3.2 && GlobalCount > 8.5 && GlobalCount < 8.8)
	{
		//4
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 1;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}

	else if(GlobalCount > 9.5 && GlobalCount < 11.2)
	{
		//5
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 1;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(zGoingInsideEarth >= 4.0  && GlobalCount > 11.2 && GlobalCount < 12.5)
	{
		//6
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 1;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
	else if(cameraPosition[2] >= 3.5 && GlobalCount > 12.5 && GlobalCount < 14.0)
	{
		//7
		Scene2 = 0;		
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 1;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
	}
*/

	if(Scene1 ==1)
	{
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
		
		gl.useProgram(shaderProgramObjectForBasic);

		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
	
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -3.0]);
	
		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForRoomForVideo, false, modelViewProjectionMatrix);
		txtglone = textureCanvasOne.getContext("2d");
		if (txtglone == null)
		{
			console.log("Failed to get the text context for WebGL");
			return;
		}

		//fill the text canvas with black color
		txtglone.fillStyle ="black";
		txtglone.fillRect(0, 0, textureCanvasOne.width, textureCanvasOne.height);

		//center the text
		txtglone.textAlign="center";
		txtglone.textBaseline="bottom";

		txtglone.font = "bold 40px Candara, serif";
		//text color
		txtglone.fillStyle = "white";

		txtglone.fillText("Team Compute Presents", textureCanvasOne.width/2, textureCanvasOne.height/2);

	    gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);		
	    gl.uniform1i(uniform_texture0_sampler_for_room_video , 0);

		gl.bindVertexArray(vao_for_font_one);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_one);
			gl.drawElements(gl.TRIANGLES, textRelatedCubeIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
		gl.useProgram(null);
	}else if(Scene3 ==1)
	{

		Scene4 = 0;	
		Scene2 = 0;
		Scene1 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;

		gl.useProgram(shaderProgramObjectForBasic);
		
		var squareTextureCoords = new Float32Array([
			0.0,0.0,
			0.0,1.0,
			1.0,1.0,
			1.0,0.0
		]);


		var squareTextureCoordsForCenter = new Float32Array([			
			1.0,0.0,
			1.0,1.0,
			0.0,1.0,
			0.0,0.0
		]);

		
	
//CENTER
		mat4.translate(myModelMatrix,myModelMatrix,[0.0,0.0,zupdate]);	
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);

		mat4.multiply(modelViewMatrix,modelViewMatrix,myModelMatrix); 
		mat4.translate(modelViewMatrix,modelViewMatrix,[0.0,-1.0,-4.5]);

		mat4.multiply(modelViewProjectionMatrix,perspectiveProjectionMatrix,modelViewMatrix);
		gl.uniformMatrix4fv(mvpUniformForRoomForVideo,false,modelViewProjectionMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
		gl.bufferData(gl.ARRAY_BUFFER,squareTextureCoordsForCenter,gl.DYNAMIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
	
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D,video_as_a_texture);
		gl.uniform1i(uniform_texture0_sampler_for_room_video,0);

		if (copyVideo) 
		{
			gl.bindTexture(gl.TEXTURE_2D, video_as_a_texture);
  			gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, video);
		}


		gl.bindVertexArray(vao_square_center);
			gl.drawArrays(gl.TRIANGLE_FAN,0,4);
		gl.bindVertexArray(null);

	
//TOP
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
		mat4.multiply(modelViewMatrix,modelViewMatrix,myModelMatrix);
		mat4.translate(modelViewMatrix,modelViewMatrix,[0.0,4.49,-4.5]);	
		mat4.multiply(modelViewProjectionMatrix,perspectiveProjectionMatrix,modelViewMatrix);
		gl.uniformMatrix4fv(mvpUniformForRoomForVideo,false,modelViewProjectionMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
		gl.bufferData(gl.ARRAY_BUFFER,squareTextureCoords,gl.DYNAMIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);

		gl.activeTexture(gl.TEXTURE0);
		if (copyVideo) 
		{
			gl.bindTexture(gl.TEXTURE_2D, video_as_a_texture);
  			gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, video4);
		}
		gl.uniform1i(uniform_texture0_sampler_for_room_video,0);

		gl.bindVertexArray(vao_square_top);
			gl.drawArrays(gl.TRIANGLE_FAN,0,4);
		gl.bindVertexArray(null);

		
//RIGHT
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);	
		mat4.multiply(modelViewMatrix,modelViewMatrix,myModelMatrix);  
		mat4.translate(modelViewMatrix,modelViewMatrix,[0.9,-1.0,-4.5]);

		mat4.multiply(modelViewProjectionMatrix,perspectiveProjectionMatrix,modelViewMatrix);
		gl.uniformMatrix4fv(mvpUniformForRoomForVideo,false,modelViewProjectionMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
		gl.bufferData(gl.ARRAY_BUFFER,squareTextureCoords,gl.DYNAMIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);

		gl.activeTexture(gl.TEXTURE0);
		if (copyVideo) 
		{
			gl.bindTexture(gl.TEXTURE_2D, video_as_a_texture);
  			gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, video1);
		}

		gl.uniform1i(uniform_texture0_sampler_for_room_video,0);
	
		gl.bindVertexArray(vao_square_right);
			gl.drawArrays(gl.TRIANGLE_FAN,0,4);
		gl.bindVertexArray(null);
	

			var squareTextureCoordsForLeft = new Float32Array([
			0.0,0.0,
			0.0,1.0,
			1.0,1.0,
			1.0,0.0
		]);
		





//LEFT
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
		mat4.multiply(modelViewMatrix,modelViewMatrix,myModelMatrix);
		mat4.translate(modelViewMatrix,modelViewMatrix,[-3.35,-1.0,-4.5]);	
		mat4.multiply(modelViewProjectionMatrix,perspectiveProjectionMatrix,modelViewMatrix);
		gl.uniformMatrix4fv(mvpUniformForRoomForVideo,false,modelViewProjectionMatrix);
	
		gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
		gl.bufferData(gl.ARRAY_BUFFER,squareTextureCoords,gl.DYNAMIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
	
		gl.activeTexture(gl.TEXTURE0);

		if (copyVideo) 
		{
			gl.bindTexture(gl.TEXTURE_2D, video_as_a_texture);
  			gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, video3);
		}

		gl.uniform1i(uniform_texture0_sampler_for_room_video,0);
	
		gl.bindVertexArray(vao_square_left);
			gl.drawArrays(gl.TRIANGLE_FAN,0,4);
		gl.bindVertexArray(null);


//BOTTOM
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);	
		mat4.multiply(modelViewMatrix,modelViewMatrix,myModelMatrix);
		mat4.translate(modelViewMatrix,modelViewMatrix,[0.0,-1.0,-4.5]);
		mat4.multiply(modelViewProjectionMatrix,perspectiveProjectionMatrix,modelViewMatrix);
		gl.uniformMatrix4fv(mvpUniformForRoomForVideo,false,modelViewProjectionMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER,vbo_texture_for_room);
		gl.bufferData(gl.ARRAY_BUFFER,squareTextureCoords,gl.DYNAMIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);

		gl.activeTexture(gl.TEXTURE0);
		if (copyVideo) 
		{
			gl.bindTexture(gl.TEXTURE_2D, video_as_a_texture);
  			gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE, video4);
		}

		gl.uniform1i(uniform_texture0_sampler_for_room_video,0);

		gl.bindVertexArray(vao_square_bottom);
			gl.drawArrays(gl.TRIANGLE_FAN,0,4);
		gl.bindVertexArray(null);



		gl.useProgram(null);
		if(zupdate <= -3.2)
		{	
			zupdate = zupdate + 0.01;
		}
	}
	else if(Scene2 ==1)
	{
		Scene3 = 0;
		Scene1 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;

		gl.useProgram(shaderProgramObjectForBasic);

		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
	
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -3.0]);
	
		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForRoomForVideo, false, modelViewProjectionMatrix);

		txtglone = textureCanvasOne.getContext("2d");
		if (txtglone == null)
		{
			console.log("Failed to get the text context for WebGL");
			return;
		}

		//fill the text canvas with black color
		txtglone.fillStyle ="black";
		txtglone.fillRect(0, 0, textureCanvasOne.width, textureCanvasOne.height);

		//center the text
		txtglone.textAlign="center";
		txtglone.textBaseline="bottom";

		txtglone.font = "bold 30px Garland, serif";
		//text color
		txtglone.fillStyle = "white";

		txtglone.fillText("AMC: A Spritual Odyssey", textureCanvasOne.width/2, textureCanvasOne.height/2);

	    gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);
	    gl.uniform1i(uniform_texture0_sampler_for_room_video , 0);

		gl.bindVertexArray(vao_for_font_two);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_two);
		//gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
		gl.drawElements(gl.TRIANGLES, textRelatedCubeIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
		gl.useProgram(null);
	}
	else if(Scene4 == 1)
	{
		Scene1 = 0;
		Scene2 = 0;
		Scene3 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;



	var modelMatrix=mat4.create();
	var viewMatrix = mat4.create();
	gl.clear(gl.COLOR_BUFFER_BIT);
	//animation loop
	gbLightOn = true;
//	var sunZTranslation = 104.0;
	var sunZTranslation = 104.4;
	gl.useProgram(upShaderProgramObject);
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,fbTexture,0);
	//gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,fbTextureOne,0);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, sun_Texture);
	gl.uniform1i(colorTextureUniform, 0);	

	mat4.translate(modelMatrix, modelMatrix, [0.5,sunTranslation,-sunZTranslation]);
//	mat4.translate(modelMatrix, modelMatrix, [-0.5,sunTranslation,-sunZTranslation]);
//	mat4.scale(modelMatrix, modelMatrix, [2.5, 2.5, 2.5]);	
	mat4.scale(modelMatrix, modelMatrix, [2.5, 2.5, 2.5]);	
	
	gl.uniformMatrix4fv(upViewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(upModelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(upProjectionUniform, false, perspectiveProjectionMatrix);


	if (gbLightOn == true)
	{		
		gl.uniform3fv(ldUniform, light_diffuse);		
		gl.uniform3fv(kdUniform, material_diffuse);		
		gl.uniform3fv(laUniform, light_ambient);	
		gl.uniform3fv(kaUniform, material_ambient);	
		gl.uniform3fv(lsUniform, light_specular);	
		gl.uniform3fv(ksUniform, material_specular);	
		gl.uniform1f(materialShininessUniform, material_shininess);
		gl.uniform4fv(lightPositionUniform, light_position);
		gl.uniform1i(isLKeyPressedUniform, 1);
	}
	else
	{
		gl.uniform1i(isLKeyPressedUniform, 0);
	}
	
    //sphere.draw();	
    gl.bindVertexArray(vao_sphere);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    	gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	var bIsVertical=true;
	gl.disable(gl.DEPTH_TEST);
	mat4.identity(modelMatrix);
	mat4.identity(viewMatrix);

	
	gl.useProgram(brightLightShaderProgramObject);
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,fbTextureTwo,0);
	gl.clear(gl.COLOR_BUFFER_BIT );	
	gl.activeTexture(gl.TEXTURE0);		
	gl.bindTexture(gl.TEXTURE_2D, fbTexture);	
//	mat4.translate(modelMatrix, modelMatrix, [2.5,sunTranslation,-sunZTranslation]);
	mat4.translate(modelMatrix, modelMatrix, [1.5,sunTranslation,-sunZTranslation]);
	//mat4.scale(modelMatrix, modelMatrix, [2.15, 2.15, 2.15]);	

mat4.scale(modelMatrix, modelMatrix, [2.15, 2.15, 2.15]);	
	gl.uniformMatrix4fv(brightLightviewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(brightLightmodelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(brightLightprojectionUniform, false, perspectiveProjectionMatrix);
	gl.uniform1i(brightLightTextureUniform, 0);	
	
	gl.uniform2f(brightLightPixelSizeUniform,1.0/800.0,1.0/600.0);	
	
	drawCube();
	gl.useProgram(null);
	
	gl.useProgram(blurShaderProgramObject);
	
	for(var i=0;i<30;i++)
	{
		gl.bindFramebuffer(gl.FRAMEBUFFER,frameBuffer);
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D, bIsVertical?fbTextureOne:fbTexture,0);
		//gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D, fbTextureOne,0);
		gl.activeTexture(gl.TEXTURE0);		
		gl.bindTexture(gl.TEXTURE_2D, bIsVertical?fbTexture:fbTextureOne);
		//gl.bindTexture(gl.TEXTURE_2D, fbTextureOne);
		mat4.identity(modelMatrix);
		mat4.identity(viewMatrix);
		//mat4.translate(modelMatrix, modelMatrix, [2.5,sunTranslation,-sunZTranslation]);			
		mat4.translate(modelMatrix, modelMatrix, [1.5,sunTranslation,-sunZTranslation]);
	
		gl.uniformMatrix4fv(blurviewMatrixUniform, false, viewMatrix);	
		gl.uniformMatrix4fv(blurmodelMatrixUniform, false, modelMatrix);	
		gl.uniformMatrix4fv(blurprojectionUniform, false, perspectiveProjectionMatrix);
		gl.uniform1i(blurTextureUniform,0);		
		if (bIsVertical == true)
		{		
			gl.uniform1i(blurIsVerticalUniform ,1);				
		}
		else
		{				
			gl.uniform1i(blurIsVerticalUniform ,0);	
		}	
		
		gl.uniform2f(blurPixelSizeUniform,1.0/800.0,1.0/600.0);		
	//	gl.uniform2f(blurPixelSizeUniform,1.0/parseFLoat(canvas.width),1.0/parseFLoat(canvas.height));		
		drawCube();
		bIsVertical =! bIsVertical;
	}	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.useProgram(null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER,null);

	gl.useProgram(bloomShaderProgramObject);
	//gl.disable(gl.DEPTH_TEST);
	//gl.clearColor(1.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	mat4.identity(modelMatrix);
	mat4.identity(viewMatrix);
	
	gl.activeTexture(gl.TEXTURE0);	
	gl.bindTexture(gl.TEXTURE_2D, fbTexture);	
	gl.activeTexture(gl.TEXTURE1);	
	gl.bindTexture(gl.TEXTURE_2D, fbTextureTwo);	
	//mat4.translate(modelMatrix, modelMatrix, [2.5,sunTranslation,-sunZTranslation]);	
	mat4.translate(modelMatrix, modelMatrix, [1.5,sunTranslation,-sunZTranslation]);

	gl.uniformMatrix4fv(bloomviewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(bloommodelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(bloomprojectionUniform, false, perspectiveProjectionMatrix);
	gl.uniform2f(bloomPixelSizeUniform, 1.0/800, 1.0/600);
	gl.uniform1i(bloomTextureUniform1, 0);	
	gl.uniform1i(bloomTextureUniform2, 1);	
	gl.uniform1i(bloomControlFlagUniform, 1);
	drawCube();
	
	
	//DRAW THE NORMAL OBJECTS WITHOUT BLOOM, earth and moon
	mat4.identity(modelMatrix);
	mat4.identity(viewMatrix);
/*	mat4.translate(modelMatrix, modelMatrix, [-0.35,-7.5,-15]);	
	mat4.scale(modelMatrix, modelMatrix, [4.0, 4.0, 4.0]);*/

	// mat4.translate(modelMatrix, modelMatrix, [-0.7,-2.8,-15]);	
	mat4.translate(modelMatrix, modelMatrix, [-0.7,-2.5,-15]);	
	mat4.scale(modelMatrix, modelMatrix, [1.1, 1.1, 1.1]);

 	mat4.rotateY(modelMatrix ,modelMatrix, degToRad(rotationForEarth));
	
	gl.uniformMatrix4fv(bloomviewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(bloommodelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(bloomprojectionUniform, false, perspectiveProjectionMatrix);
	gl.uniform1i(bloomControlFlagUniform, 0);
	gl.activeTexture(gl.TEXTURE0);	
	gl.uniform1i(bloomisLKeyPressedUniform, 1);
	var bloomlight_diffuse = new Float32Array([ 1.0, 1.0, 1.0]);
	var bloomlight_specular = new Float32Array([0.0, 0.0, 0.0]);
	var bloomlight_position = new Float32Array([-0.25, 1.0, -2.25, 1.0 ]);
	var bloommaterial_ambient = new Float32Array([ 0.0, 0.0, 0.0]);
	var bloommaterial_diffuse = new Float32Array ([1.0, 1.0,1.0]);
	var bloommaterial_specular = new Float32Array([0.0, 0.0, 0.0]);
	var bloommaterial_shininess = 1.0;//Check this with 128.0f as well
	var bloomlight_ambient = new Float32Array([ 0.0, 0.0, 0.0]);
	
	gl.uniform3fv(bloomldUniform, bloomlight_diffuse);		
	gl.uniform3fv(bloomkdUniform, bloommaterial_diffuse);		
	gl.uniform3fv(bloomlaUniform, bloomlight_ambient);	
	gl.uniform3fv(bloomkaUniform, bloommaterial_ambient);	
	gl.uniform3fv(bloomlsUniform, bloomlight_specular);	
	gl.uniform3fv(bloomksUniform, bloommaterial_specular);	
	gl.uniform1f(bloommaterialShininessUniform, bloommaterial_shininess);
	gl.uniform4fv(bloomlightPositionUniform, bloomlight_position);
	gl.bindTexture(gl.TEXTURE_2D, earth_Texture);
	gl.uniform1i(planetTextureUniform, 0);
//	sphere.draw();
	gl.bindVertexArray(vao_sphere);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    	gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
	
	/*
	
	//DRAW BLACK SPHERE ON TOP OF EARTH TO MAKE SOME PART OF EARTH VISIBLE
	mat4.identity(modelMatrix);
	mat4.identity(viewMatrix);
//	mat4.translate(modelMatrix, modelMatrix, [-0.2,-9.0,-12.0]);	
//	mat4.scale(modelMatrix, modelMatrix, [4.1, 4.1, 4.1]);

	mat4.translate(modelMatrix, modelMatrix, [-0.5,-4.4,-12.0]);	
	mat4.scale(modelMatrix, modelMatrix, [1.8, 1.8, 1.8]);
	gl.uniformMatrix4fv(bloomviewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(bloommodelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(bloomprojectionUniform, false, perspectiveProjectionMatrix);
	gl.uniform1i(bloomControlFlagUniform, 0);
	gl.uniform1i(bloomisLKeyPressedUniform, 3);	
//	sphere.draw();	
	gl.bindVertexArray(vao_sphere);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    	gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
		*/
	
	//DRAW A MOON
	mat4.identity(modelMatrix);
	mat4.identity(viewMatrix);
	/*mat4.translate(modelMatrix, modelMatrix, [-0.0,moonTranslation,-5.0]);	
	mat4.scale(modelMatrix, modelMatrix, [3.5, 3.5, 3.5]);
*/
	mat4.translate(modelMatrix, modelMatrix, [-0.3,moonTranslation,-5.0]);	
//	mat4.translate(modelMatrix, modelMatrix, [-0.2,-4.0,-5.0]);	
	mat4.scale(modelMatrix, modelMatrix, [0.7, 0.7, 0.7]);
	//mat4.rotateY(modelMatrix ,modelMatrix, degToRad(rotationForEarth));
	gl.uniformMatrix4fv(bloomviewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(bloommodelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(bloomprojectionUniform, false, perspectiveProjectionMatrix);
	gl.uniform1i(bloomControlFlagUniform, 0);
	gl.bindTexture(gl.TEXTURE_2D, moon_Texture);
	gl.uniform1i(planetTextureUniform, 0);
	gl.uniform1i(bloomisLKeyPressedUniform, 1);	
	bloomlight_diffuse = new Float32Array([ lightVariance, lightVariance, lightVariance]);
	bloomlight_specular = new Float32Array([0.0, 0.0, 0.0]);
	bloomlight_position = new Float32Array([-0.25, 1.0, -2.25, 1.0 ]);
	bloommaterial_ambient = new Float32Array([ 0.0, 0.0, 0.0]);
	bloommaterial_diffuse = new Float32Array ([1.0, 1.0,1.0]);
	bloommaterial_specular = new Float32Array([0.0, 0.0, 0.0]);
	bloommaterial_shininess = 1.0;//Check this with 128.0f as well
	bloomlight_ambient = new Float32Array([ 0.0, 0.0, 0.0]);
	
	gl.uniform3fv(bloomldUniform, bloomlight_diffuse);		
	gl.uniform3fv(bloomkdUniform, bloommaterial_diffuse);		
	gl.uniform3fv(bloomlaUniform, bloomlight_ambient);	
	gl.uniform3fv(bloomkaUniform, bloommaterial_ambient);	
	gl.uniform3fv(bloomlsUniform, bloomlight_specular);	
	gl.uniform3fv(bloomksUniform, bloommaterial_specular);	
	gl.uniform1f(bloommaterialShininessUniform, bloommaterial_shininess);
	gl.uniform4fv(bloomlightPositionUniform, bloomlight_position);
	//sphere.draw();
	

    	gl.bindVertexArray(vao_sphere);
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    		gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    	gl.bindVertexArray(null);
	
	
	gl.useProgram(null);
	

	rotationForEarth=rotationForEarth+1.0;
    if(rotationForEarth>=360.0){
        rotationForEarth=rotationForEarth-360.0;
    }


	
	if (lightVariance < 0.1)
	{
		lightVariance = lightVariance + 0.009;
	}
	if (moonTranslation > -1.9)
	{
		moonTranslation = moonTranslation - 0.0026;
	}
//	if (moonTranslation< -1.9 && sunTranslation < 2.0)
	if (moonTranslation< -1.9 && sunTranslation < 2.9)
	{
		sunTranslation = sunTranslation + 0.021;
	}




	}
	else if(Scene5 == 1)
	{
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene1 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;
		gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

		gl.useProgram(shaderProgramObjectForComputer);


		var modelViewMatrix = mat4.create();
		var modelViewProjectionMatrix = mat4.create();
		var rotationMatrix = mat4.create();
		var scaleMatrix = mat4.create();
	



		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
		mat4.identity(rotationMatrix);
		mat4.identity(scaleMatrix);



	if(fScaleValForEarth >= 18.0)
	{
		mat4.translate(modelViewMatrix, modelViewMatrix, [-4.0, 0.0, -8.0]);

//		mat4.multiply(modelViewMatrix, modelViewMatrix, modelViewMatrix);
//		mat4.translate(modelViewMatrix, modelViewMatrix, [xGoingInsideEarth, 0.0, 0.0]);
		mat4.translate(modelViewMatrix, modelViewMatrix, [xGoingInsideEarth, 0.0,zGoingInsideEarth]);
	}
	else
	{
		mat4.translate(modelViewMatrix, modelViewMatrix, [-4.0, 0.0, -8.0]);
	}
		

		mat4.scale(scaleMatrix,scaleMatrix,[1.98,1.98,1.98]);

		mat4.multiply(modelViewMatrix, modelViewMatrix, scaleMatrix);


		mat4.rotateY(modelViewMatrix ,modelViewMatrix, degToRad(fScaleValForEarth));
		mat4.rotateX(modelViewMatrix ,modelViewMatrix, degToRad(-70));
//		mat4.translate(modelViewMatrix, modelViewMatrix, [4.0, 0.0, 0.0]);
//		mat4.rotateY(modelViewMatrix ,modelViewMatrix, degToRad(rotationForEarth));

		
	

		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForComputer, false, modelViewProjectionMatrix);

		gl.bindTexture(gl.TEXTURE_2D, earth_Texture);

   		gl.uniform1i(uniform_texture0_sampler_computer, 0);
    	
    	gl.bindVertexArray(vao_earth_sphere);
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_earth_sphere_index);
            	gl.drawElements(gl.TRIANGLES, numElementsForSphereEarth, gl.UNSIGNED_SHORT, 0);
    	gl.bindVertexArray(null);
    	gl.useProgram(null);



		gl.useProgram(shaderProgramObjectFor3DNoise);

   	 	var modelViewMatrix = mat4.create();    
		mat4.identity(modelViewMatrix);

		
	 	mat4.translate(modelViewMatrix, modelViewMatrix, [1.0, 0.0, -16.0]);	    	 	

	 	gl.uniformMatrix4fv(u_modelview, false, modelViewMatrix);
     	gl.uniformMatrix4fv(u_projection, false,  perspectiveProjectionMatrix);

     	gl.uniform1f(scaleUniform, fScaleVal);
    	gl.activeTexture(gl.TEXTURE0);
    	gl.bindTexture(gl.TEXTURE_3D, textureForSphere3D);
    	gl.uniform1i(samplerUniform, 0);

    	gl.bindVertexArray(vao_sphere);
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    		gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    	gl.bindVertexArray(null);
	
		gl.useProgram(null);

		fScaleVal = fScaleVal + 0.001;



		if(fScaleValForEarth >= 18.0 )
		{	
			fScaleValForEarth = 18.0;
		}else{
		
			fScaleValForEarth = fScaleValForEarth + 0.1;	
		}


		if(xGoingInsideEarth <= 3.8)
		{
			xGoingInsideEarth = xGoingInsideEarth + 0.01;
		}


		if(zGoingInsideEarth <= 4.0)
		{
			zGoingInsideEarth = zGoingInsideEarth + 0.005;
		}


	//		fScaleValForEarth	=  fScaleValForEarth;

		
		
/*		if(fScaleValForEarth >= 360.0 )
   		{
       		fScaleValForEarth = fScaleValForEarth - 360.0;
    	}

*/
		
		rotationForEarth = rotationForEarth + 0.1;
   	/*	if(rotationForEarth >= 360.0)
   		{
       		rotationForEarth = rotationForEarth - 360.0;
    	}
*/

	
	}
	else if(Scene6 == 1)
	{
		//room

		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0
		Scene5 = 0;
		Scene1 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;


	gl.useProgram(shaderProgramObjectForBasic);

		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
	
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 1.8, -3.0]);
	
		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForRoomForVideo, false, modelViewProjectionMatrix);
		txtglone = textureCanvasOne.getContext("2d");
		if (txtglone == null)
		{
			console.log("Failed to get the text context for WebGL");
			return;
		}

		//fill the text canvas with black color
		txtglone.fillStyle ="black";
		txtglone.fillRect(0, 0, textureCanvasOne.width, textureCanvasOne.height);

		//center the text
		txtglone.textAlign="center";
		txtglone.textBaseline="bottom";

		txtglone.font = "bold 40px Garland, serif";
		//text color
		txtglone.fillStyle = "white";

		txtglone.fillText("Anandashram Sanstha", textureCanvasOne.width/2.0, textureCanvasOne.height/1.0);

		//txtglone.fillText("VIRAMIX", textureCanvasOne.width/1.89, textureCanvasOne.height/8);

	    gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);		
	    gl.uniform1i(uniform_texture0_sampler_for_room_video , 0);

		gl.bindVertexArray(vao_for_font_one);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_one);
			gl.drawElements(gl.TRIANGLES, textRelatedCubeIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
		gl.useProgram(null);












		gl.useProgram(shaderProgramObjectRoom);

    var modelViewMatrix = mat4.create();
    var modelViewProjectionMatrix = mat4.create();
  	var modelMatrix = mat4.create();

	mat4.identity(modelViewMatrix);
	mat4.identity(modelViewProjectionMatrix);	
	mat4.identity(modelMatrix);

    
    mat4.translate(modelMatrix, modelMatrix, [0.0, 0.0, -20.0]);



    var viewMatrix = mat4.create();
    var tempVec = vec3.create();
    var tempVec1 = vec3.create();

    mat4.identity(tempVec);  
    mat4.identity(viewMatrix);
    mat4.identity(tempVec1);  

    if(cameraPosition[2]> -3.5)
    {
        vec3.scale(tempVec1, cameraFront, 0.0000000001);
        vec3.add(cameraPosition, cameraPosition, cameraFront);
        vec3.add(tempVec, cameraPosition, cameraFront);
    }
    else
    {
        vec3.add(tempVec, cameraPosition, cameraFront);
    }

    mat4.lookAt(viewMatrix, cameraPosition,  tempVec, cameraUp); // res, cam_pos, target_pos, up_vec
    mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);


    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);
    mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);
    gl.uniformMatrix4fv(mvpUniformRoom, false, modelViewProjectionMatrix);

    gl.uniform4f(colorUniformRoom, 0.88, 0.66, 0.37, 1.0);
    gl.uniform1i(textureFlagUniformRoom, 0); 
    gl.bindVertexArray(vao_ground);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);


    // Adding Marble Texture to floor
   
    //gl.activeTexture(gl.TEXTURE0);
    //gl.bindTexture(gl.TEXTURE_3D, textureForRoom);
   	//gl.uniform1i(textureFlagUniformRoom, 2);
  //  gl.bindVertexArray(vao_cube_room);
//    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
    gl.bindVertexArray(null);
    //gl.bindTexture(gl.TEXTURE_3D, texture);
   
    // Done Adding Texture To floor

    gl.uniform1i(textureFlagUniformRoom, 1);
    gl.bindVertexArray(vao_cube_room);
      //gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      //gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 12, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 16, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 20, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 24, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 8, 4); 
      gl.bindVertexArray(null);
    gl.uniform1i(textureFlagUniformRoom, 0);

    gl.uniform4f(colorUniformRoom, 0.768, 0.768, 0.768, 1.0);
    gl.bindVertexArray(vao_sidepanels);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);

    gl.uniform1i(samplerUniformRoom, 0);

    gl.bindVertexArray(vao_front_top_triangle);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    gl.bindVertexArray(null);


    gl.bindVertexArray(vao_back_top_triangle);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    gl.bindVertexArray(null);

	gl.bindVertexArray(vao_rightRect);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);


    gl.bindVertexArray(vao_leftRect);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);

    gl.uniform1i(textureFlagUniformRoom, 1);
    gl.bindVertexArray(vao_head);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);

    gl.useProgram(null);



		
	}
	else if(Scene7 == 1)
	{
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene1 = 0;
		Scene8 = 0;
		Scene9 = 0;
		SceneChange = 0;

	gl.useProgram(shaderProgramObjectRoom);

    var modelViewMatrix = mat4.create();
    var modelViewProjectionMatrix = mat4.create();
    var tempModelViewMatrix = mat4.create();

	mat4.identity(tempModelViewMatrix);
	mat4.identity(modelViewMatrix);
	mat4.identity(modelViewProjectionMatrix);	

 	mat4.translate(tempModelViewMatrix, tempModelViewMatrix, [0.0, -0.6, 0.0]);
 	mat4.multiply(modelViewMatrix, tempModelViewMatrix, modelViewMatrix);

    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 2.0, 2.0]);
    mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);
    gl.uniformMatrix4fv(mvpUniformRoom, false, modelViewProjectionMatrix);

    gl.uniform4f(colorUniformRoom, 0.88, 0.66, 0.37, 1.0);
    gl.uniform1i(textureFlagUniformRoom, 0); 
    gl.bindVertexArray(vao_ground);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);


    // Adding Marble Texture to floor
   
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_3D, textureForRoom);
   	gl.uniform1i(textureFlagUniformRoom, 2);
    gl.bindVertexArray(vao_cube_room);
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
    gl.bindVertexArray(null);
    //gl.bindTexture(gl.TEXTURE_3D, texture);
   
    // Done Adding Texture To floor
/*
    gl.uniform1i(textureFlagUniformRoom, 1);
    gl.bindVertexArray(vao_cube_room);
      //gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      //gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 12, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 16, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 20, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 24, 4);
      gl.drawArrays(gl.TRIANGLE_FAN, 8, 4); 
      gl.bindVertexArray(null);
    gl.uniform1i(textureFlagUniformRoom, 0);

    gl.uniform4f(colorUniformRoom, 0.768, 0.768, 0.768, 1.0);
    gl.bindVertexArray(vao_sidepanels);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);

    gl.uniform1i(samplerUniformRoom, 0);

    gl.bindVertexArray(vao_front_top_triangle);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    gl.bindVertexArray(null);


    gl.bindVertexArray(vao_back_top_triangle);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    gl.bindVertexArray(null);

	gl.bindVertexArray(vao_rightRect);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);


    gl.bindVertexArray(vao_leftRect);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);

    gl.uniform1i(textureFlagUniformRoom, 1);
    gl.bindVertexArray(vao_head);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.bindVertexArray(null);


*/




gl.useProgram(shaderProgramObjectForComputer);

	var modelViewMatrix = mat4.create();
	var modelViewProjectionMatrix = mat4.create();

	//Computer
	mat4.identity(modelViewMatrix);
	mat4.identity(modelViewProjectionMatrix);

	mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -4.5]);

	mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

	gl.uniformMatrix4fv(mvpUniformForComputer, false, modelViewProjectionMatrix);

    //bind with computer textures
    gl.bindTexture(gl.TEXTURE_2D, computer_texture);
    gl.uniform1i(uniform_texture0_sampler_computer, 0);

	gl.bindVertexArray(vao_computer);

	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

	gl.bindVertexArray(null);

	//Hal Eye
	var scaleMatrix = mat4.create(); 

	mat4.identity(scaleMatrix);
	mat4.identity(modelViewMatrix);
	mat4.identity(modelViewProjectionMatrix);

	mat4.translate(modelViewMatrix, modelViewMatrix, [0.08, 1.475, -4.5]);
	mat4.scale(scaleMatrix,scaleMatrix,[0.3,0.3,0.3]);

	mat4.multiply(modelViewMatrix, modelViewMatrix, scaleMatrix);
	mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

	gl.uniformMatrix4fv(mvpUniformForComputer, false, modelViewProjectionMatrix);

    //bind with  hal textures
    gl.bindTexture(gl.TEXTURE_2D, hal_texture);
    gl.uniform1i(uniform_texture0_sampler_computer, 0);

	gl.bindVertexArray(vao_hal);

	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

	gl.bindVertexArray(null);

	gl.useProgram(null);




    gl.useProgram(null);



	}
	else if(Scene8 == 1)
	{
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene1 = 0;
		Scene9 = 0;
		SceneChange = 0;



	gl.useProgram(shaderProgramObjectForComputer);

		var modelViewMatrix = mat4.create();
		var modelViewProjectionMatrix = mat4.create();
	
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -4.5]);
		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForComputer, false, modelViewProjectionMatrix);

	    gl.bindTexture(gl.TEXTURE_2D, computer_texture);
	    gl.uniform1i(uniform_texture0_sampler_computer, 0);

		gl.bindVertexArray(vao_computer);
			gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
		gl.bindVertexArray(null);

		var scaleMatrix = mat4.create(); 
		mat4.identity(scaleMatrix);
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.08, 1.475, -4.5]);
		mat4.scale(scaleMatrix,scaleMatrix,[0.3,0.3,0.3]);

		mat4.multiply(modelViewMatrix, modelViewMatrix, scaleMatrix);
		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForComputer, false, modelViewProjectionMatrix);
    
    	gl.bindTexture(gl.TEXTURE_2D, hal_texture);
    	gl.uniform1i(uniform_texture0_sampler_computer, 0);

		gl.bindVertexArray(vao_hal);
			gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
		gl.bindVertexArray(null);

	gl.useProgram(null);






	gl.useProgram(shaderProgramObjectForBasic);

		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
	
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 1.8, -3.0]);
	
		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForRoomForVideo, false, modelViewProjectionMatrix);
		txtglone = textureCanvasOne.getContext("2d");
		if (txtglone == null)
		{
			console.log("Failed to get the text context for WebGL");
			return;
		}

		//fill the text canvas with black color
		txtglone.fillStyle ="black";
		txtglone.fillRect(0, 0, textureCanvasOne.width, textureCanvasOne.height);

		//center the text
		txtglone.textAlign="center";
		txtglone.textBaseline="bottom";

		txtglone.font = "bold 40px Garland, serif";
		//text color
		txtglone.fillStyle = "white";

		txtglone.fillText("VIRAMIX", textureCanvasOne.width/2.0, textureCanvasOne.height/1.0);

		//txtglone.fillText("VIRAMIX", textureCanvasOne.width/1.89, textureCanvasOne.height/8);

	    gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);		
	    gl.uniform1i(uniform_texture0_sampler_for_room_video , 0);

		gl.bindVertexArray(vao_for_font_one);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_one);
			gl.drawElements(gl.TRIANGLES, textRelatedCubeIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
		gl.useProgram(null);


	
	gl.useProgram(shaderProgramObjectForBasic);

		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
	
//		mat4.translate(modelViewMatrix, modelViewMatrix, [-1.8, 0.0, -3.0]);
		mat4.translate(modelViewMatrix, modelViewMatrix, [knowledge_update, 0.0, -3.0]);
	
		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForRoomForVideo, false, modelViewProjectionMatrix);
		txtglone = textureCanvasOne.getContext("2d");
		if (txtglone == null)
		{
			console.log("Failed to get the text context for WebGL");
			return;
		}

		//fill the text canvas with black color
		txtglone.fillStyle ="black";
		txtglone.fillRect(0, 0, textureCanvasOne.width, textureCanvasOne.height);

		//center the text
		txtglone.textAlign="center";
		txtglone.textBaseline="bottom";

		txtglone.font = "bold 40px Garland, serif";
		//text color
		txtglone.fillStyle = "red";

		txtglone.fillText("Knowledge", textureCanvasOne.width/1.5, textureCanvasOne.height/1.01);

		//txtglone.fillText("VIRAMIX", textureCanvasOne.width/1.89, textureCanvasOne.height/8);

	    gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);		
	    gl.uniform1i(uniform_texture0_sampler_for_room_video , 0);

		gl.bindVertexArray(vao_for_font_one);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_one);
			gl.drawElements(gl.TRIANGLES, textRelatedCubeIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
	gl.useProgram(null);



	
	gl.useProgram(shaderProgramObjectForBasic);

		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
	
//		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, -1.58, -3.0]);
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, is_update, -3.0]);	

		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForRoomForVideo, false, modelViewProjectionMatrix);
		txtglone = textureCanvasOne.getContext("2d");
		if (txtglone == null)
		{
			console.log("Failed to get the text context for WebGL");
			return;
		}

		//fill the text canvas with black color
		txtglone.fillStyle ="black";
		txtglone.fillRect(0, 0, textureCanvasOne.width, textureCanvasOne.height);

		//center the text
		txtglone.textAlign="center";
		txtglone.textBaseline="bottom";

		txtglone.font = "bold 40px Garland, serif";
		//text color
		txtglone.fillStyle = "green";

		txtglone.fillText("Is", textureCanvasOne.width/2.0, textureCanvasOne.height/8.0);

	    gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);		
	    gl.uniform1i(uniform_texture0_sampler_for_room_video , 0);

		gl.bindVertexArray(vao_for_font_one);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_one);
			gl.drawElements(gl.TRIANGLES, textRelatedCubeIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
	gl.useProgram(null);

	gl.useProgram(shaderProgramObjectForBasic);

		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
	
//		mat4.translate(modelViewMatrix, modelViewMatrix, [1.8, 0.0, -3.0]);
		mat4.translate(modelViewMatrix, modelViewMatrix, [interelated_update, 0.0, -3.0]);

		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForRoomForVideo, false, modelViewProjectionMatrix);
		txtglone = textureCanvasOne.getContext("2d");
		if (txtglone == null)
		{
			console.log("Failed to get the text context for WebGL");
			return;
		}

		//fill the text canvas with black color
		txtglone.fillStyle ="black";
		txtglone.fillRect(0, 0, textureCanvasOne.width, textureCanvasOne.height);

		//center the text
		txtglone.textAlign="center";
		txtglone.textBaseline="bottom";

		txtglone.font = "bold 40px Garland, serif";
		//text color
		txtglone.fillStyle = "blue";

		txtglone.fillText("Interelated", textureCanvasOne.width/3.5, textureCanvasOne.height/1.0);

	    gl.bindTexture(gl.TEXTURE_2D, textureForFontOne);
  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvasOne);		
	    gl.uniform1i(uniform_texture0_sampler_for_room_video , 0);

		gl.bindVertexArray(vao_for_font_one);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_for_font_indices_one);
			gl.drawElements(gl.TRIANGLES, textRelatedCubeIndices.length, gl.UNSIGNED_SHORT, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
	gl.useProgram(null);



	gl.useProgram(shaderProgramObjectFor3DNoise);

   	 	var modelViewMatrix = mat4.create();   
   	 	var scaleMatrix = mat4.create(); 
		mat4.identity(modelViewMatrix);
		mat4.identity(scaleMatrix);
	
	 	mat4.translate(modelViewMatrix, modelViewMatrix, [0.05, 0.4, -3.0]);	    
	 	mat4.scale(scaleMatrix,scaleMatrix,[0.1,0.1,0.1]);

		mat4.multiply(modelViewMatrix, modelViewMatrix, scaleMatrix);

	 	gl.uniformMatrix4fv(u_modelview, false, modelViewMatrix);
     	gl.uniformMatrix4fv(u_projection, false,  perspectiveProjectionMatrix);

     	gl.uniform1f(scaleUniform, fScaleVal);
    	gl.activeTexture(gl.TEXTURE0);
    	gl.bindTexture(gl.TEXTURE_3D, textureForSphere3D);
    	gl.uniform1i(samplerUniform, 0);

    	gl.bindVertexArray(vao_sphere);
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    		gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    	gl.bindVertexArray(null);
	
	gl.useProgram(null);

	fScaleVal = fScaleVal + 0.01;


	if(viramix_update == 1.8 || knowledge_update <= -1.8)
	{
		knowledge_update = knowledge_update + 0.005;
	}


	if(knowledge_update >=-1.8 && is_update >= -1.58 && interelated_update >= 1.8)
	{
		interelated_update = interelated_update - 0.005;
	}


	if(knowledge_update >=-1.8 && is_update <= -1.58)
	{
		is_update = is_update + 0.005;
	}

/*
	if(viramix_update >= 1.8)
	{
		viramix_update = viramix_update - 0.01;
	}
*/
	}
	else if(Scene9 == 1)
	{
		Scene3 = 0;
		Scene2 = 0;
		Scene4 = 0;
		Scene5 = 0;
		Scene6 = 0;
		Scene7 = 0;
		Scene8 = 0;
		Scene1 = 0;
		SceneChange = 0;

	var modelMatrix=mat4.create();
	var viewMatrix = mat4.create();
	gl.clear(gl.COLOR_BUFFER_BIT);
	gbLightOn = true;
	var sunZTranslation = 104.4;
	gl.useProgram(upShaderProgramObject);
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,fbTexture,0);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, sun_Texture);
	gl.uniform1i(colorTextureUniform, 0);	

	mat4.translate(modelMatrix, modelMatrix, [0.5,0.0,-sunZTranslation]);

	mat4.scale(modelMatrix, modelMatrix, [2.5, 2.5, 2.5]);	
	
	gl.uniformMatrix4fv(upViewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(upModelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(upProjectionUniform, false, perspectiveProjectionMatrix);


	if (gbLightOn == true)
	{		
		gl.uniform3fv(ldUniform, light_diffuse);		
		gl.uniform3fv(kdUniform, material_diffuse);		
		gl.uniform3fv(laUniform, light_ambient);	
		gl.uniform3fv(kaUniform, material_ambient);	
		gl.uniform3fv(lsUniform, light_specular);	
		gl.uniform3fv(ksUniform, material_specular);	
		gl.uniform1f(materialShininessUniform, material_shininess);
		gl.uniform4fv(lightPositionUniform, light_position);
		gl.uniform1i(isLKeyPressedUniform, 1);
	}
	else
	{
		gl.uniform1i(isLKeyPressedUniform, 0);
	}
	
    gl.bindVertexArray(vao_sphere);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    	gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	var bIsVertical=true;
	gl.disable(gl.DEPTH_TEST);
	mat4.identity(modelMatrix);
	mat4.identity(viewMatrix);

	
	gl.useProgram(brightLightShaderProgramObject);
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,fbTextureTwo,0);
	gl.clear(gl.COLOR_BUFFER_BIT );	
	gl.activeTexture(gl.TEXTURE0);		
	gl.bindTexture(gl.TEXTURE_2D, fbTexture);	
	mat4.translate(modelMatrix, modelMatrix, [1.5,sunTranslation,-sunZTranslation]);

	mat4.scale(modelMatrix, modelMatrix, [2.15, 2.15, 2.15]);	
	gl.uniformMatrix4fv(brightLightviewMatrixUniform, false, viewMatrix);	
	gl.uniformMatrix4fv(brightLightmodelMatrixUniform, false, modelMatrix);	
	gl.uniformMatrix4fv(brightLightprojectionUniform, false, perspectiveProjectionMatrix);
	gl.uniform1i(brightLightTextureUniform, 0);	
	
	gl.uniform2f(brightLightPixelSizeUniform,1.0/800.0,1.0/600.0);	
	
	drawCube();
	gl.useProgram(null);
	
	gl.useProgram(blurShaderProgramObject);
	
	for(var i=0;i<30;i++)
	{
		gl.bindFramebuffer(gl.FRAMEBUFFER,frameBuffer);
		
		gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D, bIsVertical?fbTextureOne:fbTexture,0);
		//gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D, fbTextureOne,0);
		gl.activeTexture(gl.TEXTURE0);		
		gl.bindTexture(gl.TEXTURE_2D, bIsVertical?fbTexture:fbTextureOne);
		//gl.bindTexture(gl.TEXTURE_2D, fbTextureOne);
		mat4.identity(modelMatrix);
		mat4.identity(viewMatrix);
		//mat4.translate(modelMatrix, modelMatrix, [2.5,sunTranslation,-sunZTranslation]);			
		mat4.translate(modelMatrix, modelMatrix, [1.5,sunTranslation,-sunZTranslation]);
	
		gl.uniformMatrix4fv(blurviewMatrixUniform, false, viewMatrix);	
		gl.uniformMatrix4fv(blurmodelMatrixUniform, false, modelMatrix);	
		gl.uniformMatrix4fv(blurprojectionUniform, false, perspectiveProjectionMatrix);
		gl.uniform1i(blurTextureUniform,0);		
		if (bIsVertical == true)
		{		
			gl.uniform1i(blurIsVerticalUniform ,1);				
		}
		else
		{				
			gl.uniform1i(blurIsVerticalUniform ,0);	
		}	
		
		gl.uniform2f(blurPixelSizeUniform,1.0/800.0,1.0/600.0);		
		drawCube();
		bIsVertical =! bIsVertical;
	}	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.useProgram(null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER,null);

	gl.useProgram(bloomShaderProgramObject);
		gl.clear(gl.COLOR_BUFFER_BIT);
		mat4.identity(modelMatrix);
		mat4.identity(viewMatrix);
	
		gl.activeTexture(gl.TEXTURE0);	
		gl.bindTexture(gl.TEXTURE_2D, fbTexture);	
		gl.activeTexture(gl.TEXTURE1);	
		gl.bindTexture(gl.TEXTURE_2D, fbTextureTwo);	
		mat4.translate(modelMatrix, modelMatrix, [1.5,sunTranslation,-sunZTranslation]);

		gl.uniformMatrix4fv(bloomviewMatrixUniform, false, viewMatrix);	
		gl.uniformMatrix4fv(bloommodelMatrixUniform, false, modelMatrix);	
		gl.uniformMatrix4fv(bloomprojectionUniform, false, perspectiveProjectionMatrix);
		gl.uniform2f(bloomPixelSizeUniform, 1.0/800, 1.0/600);
		gl.uniform1i(bloomTextureUniform1, 0);	
		gl.uniform1i(bloomTextureUniform2, 1);	
		gl.uniform1i(bloomControlFlagUniform, 1);
		drawCube();
	
	gl.useProgram(null);
	


	
/*		gl.useProgram(shaderProgramObjectFor3DNoise);

   	 	var modelViewMatrix = mat4.create();    
		mat4.identity(modelViewMatrix);
		
	 	mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -8.0]);	    
	 	
	 	gl.uniformMatrix4fv(u_modelview, false, modelViewMatrix);
     	gl.uniformMatrix4fv(u_projection, false,  perspectiveProjectionMatrix);

     	gl.uniform1f(scaleUniform, fScaleVal);
    	gl.activeTexture(gl.TEXTURE0);
    	gl.bindTexture(gl.TEXTURE_3D, textureForSphere3D);
    	gl.uniform1i(samplerUniform, 0);

    	gl.bindVertexArray(vao_sphere);
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_sphere_index);
    		gl.drawElements(gl.TRIANGLES, numElementsForSphere, gl.UNSIGNED_SHORT, 0);
    	gl.bindVertexArray(null);
	
		gl.useProgram(null);

		fScaleVal = fScaleVal + 0.001;



		gl.useProgram(shaderProgramObjectForComputer);

		var modelViewMatrix = mat4.create();
		var modelViewProjectionMatrix = mat4.create();
		var rotationMatrix = mat4.create();
		var scaleMatrix = mat4.create();
	
		mat4.identity(modelViewMatrix);
		mat4.identity(modelViewProjectionMatrix);
		mat4.identity(rotationMatrix);
		mat4.identity(scaleMatrix);
	
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -8.0]);
		
		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, 4.0]);
	
		mat4.rotateY(modelViewMatrix ,modelViewMatrix, degToRad(rotationForEarth));
		mat4.rotateX(modelViewMatrix ,modelViewMatrix, degToRad(-70));
		
		mat4.scale(scaleMatrix,scaleMatrix,[0.48,0.48,0.48]);
		mat4.multiply(modelViewMatrix, modelViewMatrix, scaleMatrix);
			
	


		mat4.multiply(modelViewProjectionMatrix, perspectiveProjectionMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(mvpUniformForComputer, false, modelViewProjectionMatrix);

		gl.bindTexture(gl.TEXTURE_2D, earth_Texture);

   		gl.uniform1i(uniform_texture0_sampler_computer, 0);
    	
    	gl.bindVertexArray(vao_earth_sphere);
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_earth_sphere_index);
            	gl.drawElements(gl.TRIANGLES, numElementsForSphereEarth, gl.UNSIGNED_SHORT, 0);
    	gl.bindVertexArray(null);
    
		
		if(goingIntoIndia <= -1.5)
		{
			goingIntoIndia = goingIntoIndia - 0.7;

		}
		
		if(rotationForEarth >= 5.0)
		{
			flagThis=1;
			rotationForEarth = rotationForEarth;
		}
		else
		{
			rotationForEarth = rotationForEarth + 0.1;
		}
*/   	/*	if(rotationForEarth >= 360.0)
   		{
       		rotationForEarth = rotationForEarth - 360.0;
    	}
*/
	
		
		

	gl.useProgram(null);

	}else if(SceneChange ==1)
	{
		//Nothing
	}

//----------------------
	gl.useProgram(null);

	requestAnimationFrame(draw,canvas);


}

function keyDownFunction(event){

	switch(event.keyCode)
	{
		case 27: // Escape
			uninitialize();
			window.close();
			break;
		case 70: //
			toggleFullScreen();
		break;
		case 9://tab
			if(SceneChange==0)
			{
				SceneChange = 1;
				
				Scene1 = 0;
				Scene2 = 0;
				Scene3 = 0;
				Scene4 = 0;
				Scene5 = 0;
				Scene9 = 0;			
				Scene6 = 0;			
				Scene7 = 0;			
				Scene8 = 0;
			}else{
				SceneChange = 0;
			}
			break;		
		case 71: // G Key Test Sound
			if(StartScene == 0)
			{
				StartScene = 1;
			}else{
				StartScene = 0;
			}


		/*	if(audioCheck == 0)
			{			
				checkAudio.play();	
				audioCheck =1;
			}else{
				checkAudio.pause();
				audioCheck =0;
			}
			*/
		break;
		case 49://1 Key
			if(Scene1==0)
			{
				Scene1=1;
				
				Scene2=0;
				Scene3=0;
				Scene4=0;
				Scene5=0;
				Scene9=0;			
				Scene6=0;			
				Scene7=0;			
				Scene8=0;
				SceneChange = 0;
			}else{
				Scene1 =0;
			}
		break;
		case 50://2 Key 
			if(Scene2==0)
			{
				Scene2=1;

				Scene1=0;
				Scene3=0;
				Scene4=0;
				Scene5=0;
				Scene9=0;			
				Scene6=0;			
				Scene7=0;			
				Scene8=0;
				SceneChange = 0;
			}else{
				Scene2 =0;
			}
		break;
		case 51: //3 Key
			if(Scene3==0)
			{
				Scene3=1;

				Scene1=0;
				Scene2=0;
				Scene4=0;
				Scene5=0;
				Scene9=0;			
				Scene6=0;			
				Scene7=0;			
				Scene8=0;
				SceneChange = 0;
			}else{
				Scene3 =0;
			}
		break;
		case 52: //4 key
			if(Scene4==0)
			{
				Scene4=1;

				Scene1=0;
				Scene2=0;
				Scene3=0;
				Scene5=0;
				Scene9=0;			
				Scene6=0;			
				Scene7=0;			
				Scene8=0;
				SceneChange = 0;
			}else{
				Scene4 =0;
			}
		break;
		case 53: //5 key
			if(Scene5==0)
			{
				Scene5 =1;
				Scene4=0;
				Scene1=0;
				Scene2=0;
				Scene3=0;			
				Scene9=0;			
				Scene6=0;			
				Scene7=0;			
				Scene8=0;
				SceneChange = 0;
			}else{
				Scene5 =0;
			}
		break;		
		case 54: //6 key
			if(Scene6==0)
			{
				Scene6 =1;
				Scene4=0;
				Scene1=0;
				Scene2=0;
				Scene3=0;			
				Scene5=0;			
				Scene9=0;			
				Scene7=0;			
				Scene8=0;
				SceneChange = 0;
			}else{
				Scene6 =0;
			}
		break;		
		case 55: //7 key
			if(Scene7==0)
			{
				Scene7 =1;
				Scene4=0;
				Scene1=0;
				Scene2=0;
				Scene3=0;			
				Scene5=0;			
				Scene6=0;			
				Scene9=0;			
				Scene8=0;
				SceneChange = 0;
			}else{
				Scene7 =0;
			}
		break;		
		case 56: //8 key
			if(Scene8==0)
			{
				Scene8 =1;
				Scene4=0;
				Scene1=0;
				Scene2=0;
				Scene3=0;			
				Scene5=0;			
				Scene6=0;			
				Scene7=0;			
				Scene9=0;
				SceneChange = 0;
			}else{
				Scene8 =0;
			}
		break;		
		case 57: //9 key
			if(Scene9==0)
			{
				Scene9 =1;
				
				Scene1=0;
				Scene2=0;
				Scene3=0;	
				Scene4=0;		
				Scene5=0;			
				Scene6=0;			
				Scene7=0;			
				Scene8=0;		
				SceneChange = 0;	
			}else{
				Scene9 =0;
			}
		break;								
		case 48: // 0 key
			if(defaultAudioCheck == 0)
			{			
				defaultAudio.play();	
				defaultAudioCheck =1;
			}else{
				defaultAudio.pause();
				defaultAudioCheck =0;
			}		
		break;		
		case 83: // S key
			if(audioOfSirCheck == 0)
			{			
				audioOfSir.play();	
				audioOfSirCheck =1;
			}else{
				audioOfSir.pause();
				audioOfSirCheck =0;
			}				
		break;
	}
}

function drawCube()
{
	gl.bindVertexArray(vao_cube);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 8, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 12, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 16, 4);
	gl.drawArrays(gl.TRIANGLE_FAN, 20, 4);
	gl.bindVertexArray(null);
}

function mouseDownFunction(){
	//alert("mouse is clicked");
}

function uninitialize(){

		if(vao_square)
		{
			gl.deleteVertexArray(vao_square);
			vao_square = null;
		}

		if(vbo_square_position){
			gl.deleteBuffer(vbo_square_position);
			vbo_square_position = null;
		}


		if(vao_square1)
		{
			gl.deleteVertexArray(vao_square1);
			vao_square1 = null;
		}

		if(vbo_square1_position){
			gl.deleteBuffer(vbo_square_position1);
			vbo_square_position1 = null;
		}

		if(vao_square2)
		{
			gl.deleteVertexArray(vao_square2);
			vao_square2 = null;
		}

		if(vbo_square2_position){
			gl.deleteBuffer(vbo_square_position2);
			vbo_square_position2 = null;
		}


		if(vao_square3)
		{
			gl.deleteVertexArray(vao_square3);
			vao_square3 = null;
		}

		if(vbo_square3_position){
			gl.deleteBuffer(vbo_square_position3);
			vbo_square_position3 = null;
		}

		if(vao_square4)
		{
			gl.deleteVertexArray(vao_square4);
			vao_square4 = null;
		}

		if(vbo_square4_position){
			gl.deleteBuffer(vbo_square_position4);
			vbo_square_position4 = null;
		}

		if(vbo_texture_for_room){
			gl.deleteBuffer(vbo_texture_for_room);
			vbo_texture_for_room = null;
		}

		if(vao_for_font_one)
		{
			gl.deleteVertexArray(vao_for_font_one);
			vao_for_font_one = null;
		}


		if(vbo_for_font_position_one){
			gl.deleteBuffer(vbo_for_font_position_one);
			vbo_for_font_position_one = null;
		}

		if(vbo_for_font_texture_one){
			gl.deleteBuffer(vbo_for_font_texture_one);
			vbo_for_font_texture_one = null;
		}

		if(vbo_for_font_indices_one){
			gl.deleteBuffer(vbo_for_font_indices_one);
			vbo_for_font_indices_one = null;
		}


		if(vao_for_font_two)
		{
			gl.deleteVertexArray(vao_for_font_two);
			vao_for_font_two = null;
		}


		if(vbo_for_font_position_two){
			gl.deleteBuffer(vbo_for_font_position_two);
			vbo_for_font_position_two = null;
		}

		if(vbo_for_font_texture_two){
			gl.deleteBuffer(vbo_for_font_texture_two);
			vbo_for_font_texture_two = null;
		}

		if(vbo_for_font_indices_two){
			gl.deleteBuffer(vbo_for_font_indices_two);
			vbo_for_font_indices_two = null;
		}



		if(vao_sphere)
		{
			gl.deleteVertexArray(vao_sphere);
			vao_sphere = null;
		}

		if(vbo_sphere_position){
			gl.deleteBuffer(vbo_sphere_position);
			vbo_sphere_position = null;
		}

		if(vbo_sphere_position){
			gl.deleteBuffer(vbo_sphere_position);
			vbo_sphere_position = null;
		}


		if(vbo_sphere_normal){
			gl.deleteBuffer(vbo_sphere_normal);
			vbo_sphere_normal = null;
		}


		if(vbo_sphere_texture){
			gl.deleteBuffer(vbo_sphere_texture);
			vbo_sphere_texture = null;
		}

		if(vbo_sphere_index){
			gl.deleteBuffer(vbo_sphere_index);
			vbo_sphere_index = null;
		}

		if (upShaderProgramObject)
		{
			if(upFragmentShaderObject)
			{
				gl.detachShader(upShaderProgramObject, upFragmentShaderObject);
				gl.deleteShader(upFragmentShaderObject);
				upFragmentShaderObject = null;
			}
			
			if (upVertexShaderObject)
			{
				gl.detachShader(upShaderProgramObject, upVertexShaderObject);
				gl.deleteShader(upVertexShaderObject);
				upVertexShaderObject = null;
			}
			gl.deleteProgram(upShaderProgramObject);
			upShaderProgramObject = null;
		}

		if(shaderProgramObjectForBasic){
			if(fragmentShaderObjectForBasic){
					gl.detachShader(shaderProgramObjectForBasic,fragmentShaderObjectForBasic);
					gl.deleteShader(fragmentShaderObjectForBasic);
					fragmentShaderObjectForBasic = null;
			}
			if(vertexShaderObjectForBasic){
				gl.detachShader(shaderProgramObjectForBasic,vertexShaderObjectForBasic);
				gl.deleteShader(vertexShaderObjectForBasic);
				vertexShaderObjectForBasic = null;
			}

			gl.deleteProgram(shaderProgramObjectForBasic);
			shaderProgramObjectForBasic = null;
		}



		if(vao_ground)
    	{
      	  gl.deleteVertexArray(vao_ground);
     	   vao_ground = null;
   		}

  		if(vbo_ground_position)
    	{
        	gl.deleteBuffer(vbo_ground_position);
        	vbo_ground_position = null;
    	}

    	if(shaderProgramObjectRoom)
    	{
        	if(fragmentShaderObjectRoom)
        	{
            	gl.detachShader(shaderProgramObjectRoom, fragmentShaderObjectRoom);
            	gl.deleteShader(fragmentShaderObjectRoom);
            	fragmentShaderObjectRoom = null;
        	}

        	if(vertexShaderObjectRoom)
        	{
            	gl.detachShader(shaderProgramObjectRoom, vertexShaderObjectRoom);
            	gl.deleteShader(vertexShaderObjectRoom);
            	vertexShaderObjectRoom = null;
        	}	

        	gl.deleteProgram(shaderProgramObjectRoom);
        	shaderProgramObjectRoom = null;
    	}

	if(vao_earth_sphere)
        {
            gl.deleteVertexArray(vao_earth_sphere);
            vao_earth_sphere = null;
        }

        if(vbo_earth_sphere_position){
            gl.deleteBuffer(vbo_earth_sphere_position);
            vbo_earth_sphere_position = null;
        }



        if(vbo_earth_sphere_normal){
            gl.deleteBuffer(vbo_earth_sphere_normal);
            vbo_earth_sphere_normal = null;
        }


        if(vbo_earth_sphere_texture){
            gl.deleteBuffer(vbo_earth_sphere_texture);
            vbo_earth_sphere_texture = null;
        }

        if(vbo_earth_sphere_index){
            gl.deleteBuffer(vbo_earth_sphere_index);
            vbo_earth_sphere_index = null;
        }

   	if (computer_texture)
	{
		gl.deleteTexture(computer_texture);
		computer_texture = 0;
	}

    //destroy the hal texture
	if (hal_texture)
	{
		gl.deleteTexture(hal_texture);
		hal_texture = 0;
	}

    //delete the computer vao vertex array
	if (vao_computer)
	{
		gl.deleteVertexArray(vao_computer);
		vao_computer = null;
	}

    //delete the vbo texture buffer 
	if (vbo_texture_for_computer)
	{
		gl.deleteBuffer(vbo_texture_for_computer);
		vbo_texture_for_computer = null;
	}

    //delete the vbo position buffer
	if (vbo_position_for_computer)
	{
		gl.deleteBuffer(vbo_position_for_computer);
		vbo_position_for_computer = null;
	}

	if (shaderProgramObjectForComputer)
	{
		if (fragmentShaderObjectForComputer)
		{
			gl.detachShader(shaderProgramObjectForComputer, fragmentShaderObjectForComputer);
			gl.deleteShader(fragmentShaderObjectForComputer);
			fragmentShaderObjectForComputer = null;
		}

		if (vertexShaderObjectForComputer)
		{
           gl.detachShader(shaderProgramObjectForComputer, vertexShaderObjectForComputer);
           gl.deleteShader(vertexShaderObjectForComputer);
           vertexShaderObjectForComputer = null;
		}

		gl.deleteProgram(shaderProgramObjectForComputer);
		shaderProgramObjectForComputer = null;
	}
}

function getRandom() {
  return Math.random();
}

function degToRad(degrees){
    return(degrees * Math.PI / 180);
}


function uvSphere(radius, slices, stacks)
{
    radius = radius || 0.5;
    slices = slices || 32;
    stacks = stacks || 16;
    var vertexCount = (slices+1)*(stacks+1);
    var vertices = new Float32Array( 3*vertexCount );
    var normals = new Float32Array( 3* vertexCount );
    var texCoords = new Float32Array( 2*vertexCount );
    var indices = new Uint16Array( 2*slices*stacks*3 );
    var du = 2*Math.PI/slices;
    var dv = Math.PI/stacks;
    var i,j,u,v,x,y,z;
    var indexV = 0;
    var indexT = 0;
    for (i = 0; i <= stacks; i++) {
       v = -Math.PI/2 + i*dv;
       for (j = 0; j <= slices; j++) {
          u = j*du;
          x = Math.cos(u)*Math.cos(v);
          y = Math.sin(u)*Math.cos(v);
          z = Math.sin(v);
          vertices[indexV] = radius*x;
          normals[indexV++] = x;
          vertices[indexV] = radius*y;
          normals[indexV++] = y;
          vertices[indexV] = radius*z;
          normals[indexV++] = z;
          texCoords[indexT++] = j/slices;
          texCoords[indexT++] = i/stacks;
       } 
    }
    var k = 0;
    for (j = 0; j < stacks; j++) {
       var row1 = j*(slices+1);
       var row2 = (j+1)*(slices+1);
       for (i = 0; i < slices; i++) {
           indices[k++] = row1 + i;
           indices[k++] = row2 + i + 1;
           indices[k++] = row2 + i;
           indices[k++] = row1 + i;
           indices[k++] = row1 + i + 1;
           indices[k++] = row2 + i + 1;
       }
    }
    return {
        vertexPositionsForSphere: vertices,
        vertexNormalsForSphere: normals,
        vertexTextureCoordsForSphere: texCoords,
        indicesForSphere: indices
    };
 }

function getTexture()
{

  
    var data = make3DNoiseTexture();
    textureForSphere3D = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);


    gl.bindTexture(gl.TEXTURE_3D, textureForSphere3D);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
 	 gl.texImage3D(gl.TEXTURE_3D,
         0,
          gl.RGBA,
           Noise3DTexSize,
        Noise3DTexSize,
        Noise3DTexSize,
        0,
        gl.RGBA,
         gl.UNSIGNED_BYTE,
         data);
  	
  	gl.generateMipmap(gl.TEXTURE_3D);
	gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_WRAP_S,gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_WRAP_T,gl.REPEAT);
  
   
}



function getTextureForRoomMarble()
{

    var data = make3DNoiseTexture();
    textureForRoom = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);


    gl.bindTexture(gl.TEXTURE_3D, textureForRoom);
 	gl.texParameterf(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameterf(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameterf(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);

    // here MAG and MIN filter need to check as they not worked 
    gl.texImage3D(gl.TEXTURE_3D,
         0,
          gl.RGBA,
           Noise3DTexSize,
        Noise3DTexSize,
        Noise3DTexSize,
        0,
        gl.RGBA,
         gl.UNSIGNED_BYTE,
         data);

    gl.generateMipmap(gl.TEXTURE_3D);
    //gl.bindTexture(gl.TEXTURE_3D, 0);
}






function setupVideo(url) 
{
  const video = document.createElement('video');

  var playing = false;
  var timeupdate = false;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;


  video.addEventListener('playing', 
  function() 
  {
     playing = true;
     checkReady();
  }, true);

  video.addEventListener('timeupdate', 
  function() 
  {
     timeupdate = true;
     checkReady();
  }, true);

  video.src = url;
  video.play();

  function checkReady() 
  {
    if (playing && timeupdate) 
    {
      copyVideo = true;
    }
  }

  return video;
}




function setupVideo2(url) 
{
  const video = document.createElement('video');

  var playing = false;
  var timeupdate = false;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;


  video.addEventListener('playing', 
  function() 
  {
     playing = true;
     checkReady();
  }, true);

  video.addEventListener('timeupdate', 
  function() 
  {
     timeupdate = true;
     checkReady();
  }, true);

  video.src = url;
  video.play();

  function checkReady() 
  {
    if (playing && timeupdate) 
    {
      copyVideo = true;
    }
  }

  return video;
}

