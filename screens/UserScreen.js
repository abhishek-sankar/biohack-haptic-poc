// screens/UserScreen.js
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Vibration,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import { LineChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const FORCE_DATA = [
  {
    time: 0.020709991455078125,
    force: 0.0042,
  },
  {
    time: 0.11889481544494629,
    force: 0.0082,
  },
  {
    time: 0.21898770332336426,
    force: 0.0085,
  },
  {
    time: 0.3399519920349121,
    force: 0.002,
  },
  {
    time: 0.44091367721557617,
    force: 0.0161,
  },
  {
    time: 0.5406637191772461,
    force: 0.0091,
  },
  {
    time: 0.6517055034637451,
    force: -0.0062,
  },
  {
    time: 0.7522997856140137,
    force: 0.0042,
  },
  {
    time: 0.8523299694061279,
    force: -0.0006,
  },
  {
    time: 0.9637529850006104,
    force: -0.0014,
  },
  {
    time: 1.0713465213775635,
    force: 0.0153,
  },
  {
    time: 1.180027961730957,
    force: 0.0025,
  },
  {
    time: 1.2962069511413574,
    force: -0.0093,
  },
  {
    time: 1.3996689319610596,
    force: 0.0025,
  },
  {
    time: 1.5109868049621582,
    force: -0.0085,
  },
  {
    time: 1.6286194324493408,
    force: -0.0079,
  },
  {
    time: 1.7330141067504883,
    force: 0.0125,
  },
  {
    time: 1.8443195819854736,
    force: 0.0093,
  },
  {
    time: 1.9535210132598877,
    force: 0.0076,
  },
  {
    time: 2.0539071559906006,
    force: 0.0045,
  },
  {
    time: 2.1565208435058594,
    force: 0.0136,
  },
  {
    time: 2.2658238410949707,
    force: 0.0147,
  },
  {
    time: 2.3811802864074707,
    force: 0.0074,
  },
  {
    time: 2.487881898880005,
    force: -0.0071,
  },
  {
    time: 2.5767781734466553,
    force: -0.0003,
  },
  {
    time: 2.6884751319885254,
    force: 0.0076,
  },
  {
    time: 2.799877166748047,
    force: 0.0082,
  },
  {
    time: 2.910717248916626,
    force: 0.0025,
  },
  {
    time: 3.000089168548584,
    force: 0.0105,
  },
  {
    time: 3.111241340637207,
    force: 0.0051,
  },
  {
    time: 3.2230284214019775,
    force: -0.0025,
  },
  {
    time: 3.3295059204101562,
    force: 0.0057,
  },
  {
    time: 3.4339678287506104,
    force: 0.0057,
  },
  {
    time: 3.545241355895996,
    force: -0.004,
  },
  {
    time: 3.659064292907715,
    force: -0.0028,
  },
  {
    time: 3.76957368850708,
    force: 0.0147,
  },
  {
    time: 3.8742740154266357,
    force: 0.0133,
  },
  {
    time: 3.980762481689453,
    force: 0.0192,
  },
  {
    time: 4.090549945831299,
    force: 0.0102,
  },
  {
    time: 4.20185923576355,
    force: 0.0212,
  },
  {
    time: 4.313091278076172,
    force: 0.0122,
  },
  {
    time: 4.424471616744995,
    force: 0.019,
  },
  {
    time: 4.535093545913696,
    force: 0.0074,
  },
  {
    time: 4.628551959991455,
    force: 0.0173,
  },
  {
    time: 4.735942840576172,
    force: -0.0042,
  },
  {
    time: 4.847208023071289,
    force: 0.0059,
  },
  {
    time: 4.958202362060547,
    force: 0.0003,
  },
  {
    time: 5.047447204589844,
    force: 0.0184,
  },
  {
    time: 5.158274412155151,
    force: 0.0139,
  },
  {
    time: 5.2481348514556885,
    force: 0.013,
  },
  {
    time: 5.365000486373901,
    force: 0.0025,
  },
  {
    time: 5.476832866668701,
    force: 0.0122,
  },
  {
    time: 5.584398984909058,
    force: 0.0136,
  },
  {
    time: 5.681861162185669,
    force: 0.0042,
  },
  {
    time: 5.781918048858643,
    force: 0.0093,
  },
  {
    time: 5.889224529266357,
    force: 0.0181,
  },
  {
    time: 5.989074468612671,
    force: 0.0195,
  },
  {
    time: 6.093526840209961,
    force: 0.015,
  },
  {
    time: 6.204933166503906,
    force: 0.0144,
  },
  {
    time: 6.315609455108643,
    force: 0.0215,
  },
  {
    time: 6.4063122272491455,
    force: 0.0184,
  },
  {
    time: 6.520907878875732,
    force: 0.0074,
  },
  {
    time: 6.627758502960205,
    force: 0.0224,
  },
  {
    time: 6.742715358734131,
    force: 0.0037,
  },
  {
    time: 6.848045825958252,
    force: -0.0014,
  },
  {
    time: 6.945928573608398,
    force: 0.0167,
  },
  {
    time: 7.0502259731292725,
    force: -0.0105,
  },
  {
    time: 7.143291711807251,
    force: 0.0048,
  },
  {
    time: 7.250811815261841,
    force: 0.0263,
  },
  {
    time: 7.361140251159668,
    force: 0.0116,
  },
  {
    time: 7.451268434524536,
    force: 0.0252,
  },
  {
    time: 7.56247353553772,
    force: -0.0054,
  },
  {
    time: 7.673643350601196,
    force: 0.028,
  },
  {
    time: 7.784929037094116,
    force: 0.0156,
  },
  {
    time: 7.891515016555786,
    force: 0.0057,
  },
  {
    time: 7.985251426696777,
    force: 0.002,
  },
  {
    time: 8.09598994255066,
    force: 0.0008,
  },
  {
    time: 8.18565034866333,
    force: 0.0096,
  },
  {
    time: 8.296529769897461,
    force: 0.0051,
  },
  {
    time: 8.391529321670532,
    force: 0.0014,
  },
  {
    time: 8.497055053710938,
    force: 0.0113,
  },
  {
    time: 8.616185903549194,
    force: 0.0017,
  },
  {
    time: 8.726680517196655,
    force: 0.0048,
  },
  {
    time: 8.830368041992188,
    force: 0.0192,
  },
  {
    time: 8.937858819961548,
    force: 0.0156,
  },
  {
    time: 9.036565780639648,
    force: 0.0096,
  },
  {
    time: 9.142477035522461,
    force: 0.0184,
  },
  {
    time: 9.25342845916748,
    force: 0.0269,
  },
  {
    time: 9.353962659835815,
    force: 0.0212,
  },
  {
    time: 9.457139015197754,
    force: 0.0263,
  },
  {
    time: 9.565440893173218,
    force: 0.0045,
  },
  {
    time: 9.672182321548462,
    force: 0.0243,
  },
  {
    time: 9.777202367782593,
    force: 0.011,
  },
  {
    time: 9.888078927993774,
    force: -0.0102,
  },
  {
    time: 9.999497652053833,
    force: 0.0153,
  },
  {
    time: 10.110901355743408,
    force: 0.0232,
  },
  {
    time: 10.221958637237549,
    force: 0.0198,
  },
  {
    time: 10.311052083969116,
    force: 0.0246,
  },
  {
    time: 10.428423404693604,
    force: 0.0153,
  },
  {
    time: 10.533591508865356,
    force: 0.0258,
  },
  {
    time: 10.644243478775024,
    force: 0.0099,
  },
  {
    time: 10.734762191772461,
    force: 0.0102,
  },
  {
    time: 10.845024347305298,
    force: 0.0229,
  },
  {
    time: 10.949988842010498,
    force: 0.0159,
  },
  {
    time: 11.065725088119507,
    force: 0.004,
  },
  {
    time: 11.161103963851929,
    force: 0.0161,
  },
  {
    time: 11.267987966537476,
    force: 0.026,
  },
  {
    time: 11.368284702301025,
    force: 0.0272,
  },
  {
    time: 11.46823501586914,
    force: 0.0232,
  },
  {
    time: 11.57961893081665,
    force: 0.0342,
  },
  {
    time: 11.690884590148926,
    force: 0.0161,
  },
  {
    time: 11.802134990692139,
    force: 0.0224,
  },
  {
    time: 11.909172058105469,
    force: 0.0252,
  },
  {
    time: 12.015074014663696,
    force: 0.0309,
  },
  {
    time: 12.133721351623535,
    force: 0.0218,
  },
  {
    time: 12.243509769439697,
    force: 0.019,
  },
  {
    time: 12.345276832580566,
    force: 0.0025,
  },
  {
    time: 12.459751844406128,
    force: 0.0031,
  },
  {
    time: 12.559166193008423,
    force: -0.0071,
  },
  {
    time: 12.669956684112549,
    force: 0.0252,
  },
  {
    time: 12.783692121505737,
    force: -0.002,
  },
  {
    time: 12.892616033554077,
    force: 0.0122,
  },
  {
    time: 12.993091583251953,
    force: 0.0159,
  },
  {
    time: 13.092870712280273,
    force: 0.0136,
  },
  {
    time: 13.215341567993164,
    force: 0.0161,
  },
  {
    time: 13.332155704498291,
    force: 0.0255,
  },
  {
    time: 13.437787771224976,
    force: 0.0136,
  },
  {
    time: 13.548637390136719,
    force: 0.0209,
  },
  {
    time: 13.638185501098633,
    force: 0.0125,
  },
  {
    time: 13.755661487579346,
    force: 0.0031,
  },
  {
    time: 13.871840000152588,
    force: 0.0159,
  },
  {
    time: 13.98374629020691,
    force: 0.0122,
  },
  {
    time: 14.094407558441162,
    force: 0.0116,
  },
  {
    time: 14.205673456192017,
    force: 0.0144,
  },
  {
    time: 14.316067934036255,
    force: 0.0167,
  },
  {
    time: 14.406160593032837,
    force: 0.0076,
  },
  {
    time: 14.51729416847229,
    force: 0.0164,
  },
  {
    time: 14.62050199508667,
    force: 0.011,
  },
  {
    time: 14.733685731887817,
    force: 0.017,
  },
  {
    time: 14.840334415435791,
    force: 0.0144,
  },
  {
    time: 14.951435565948486,
    force: 0.0249,
  },
  {
    time: 15.062366724014282,
    force: 0.0113,
  },
  {
    time: 15.179541110992432,
    force: -0.0028,
  },
  {
    time: 15.274194955825806,
    force: 0.0085,
  },
  {
    time: 15.37405014038086,
    force: 0.0246,
  },
  {
    time: 15.48513126373291,
    force: 0.0144,
  },
  {
    time: 15.585602521896362,
    force: 0.0204,
  },
  {
    time: 15.688248872756958,
    force: 0.0119,
  },
  {
    time: 15.796954154968262,
    force: -0.0054,
  },
  {
    time: 15.908187627792358,
    force: 0.002,
  },
  {
    time: 16.019341230392456,
    force: -0.011,
  },
  {
    time: 16.108670711517334,
    force: 0.0153,
  },
  {
    time: 16.21994161605835,
    force: 0.0068,
  },
  {
    time: 16.327486276626587,
    force: 0.0136,
  },
  {
    time: 16.420116662979126,
    force: 0.0212,
  },
  {
    time: 16.535900831222534,
    force: 0.0079,
  },
  {
    time: 16.647251844406128,
    force: 0.0125,
  },
  {
    time: 16.75047755241394,
    force: 0.0136,
  },
  {
    time: 16.84296751022339,
    force: -0.011,
  },
  {
    time: 16.95457434654236,
    force: 0.0198,
  },
  {
    time: 17.065229892730713,
    force: 0.0181,
  },
  {
    time: 17.154480695724487,
    force: 0.0156,
  },
  {
    time: 17.265851974487305,
    force: 0.0159,
  },
  {
    time: 17.37713885307312,
    force: 0.002,
  },
  {
    time: 17.488368034362793,
    force: 0.0272,
  },
  {
    time: 17.588573932647705,
    force: 0.0243,
  },
  {
    time: 17.688132524490356,
    force: 0.0258,
  },
  {
    time: 17.79527473449707,
    force: 0.0212,
  },
  {
    time: 17.910674810409546,
    force: 0.0266,
  },
  {
    time: 18.00031876564026,
    force: 0.0181,
  },
  {
    time: 18.111578464508057,
    force: 0.0269,
  },
  {
    time: 18.22242760658264,
    force: 0.032,
  },
  {
    time: 18.311954498291016,
    force: 0.0337,
  },
  {
    time: 18.42322611808777,
    force: 0.0362,
  },
  {
    time: 18.534062147140503,
    force: 0.0275,
  },
  {
    time: 18.623374700546265,
    force: 0.0229,
  },
  {
    time: 18.73872423171997,
    force: 0.0294,
  },
  {
    time: 18.846039056777954,
    force: 0.03,
  },
  {
    time: 18.956934213638306,
    force: 0.0371,
  },
  {
    time: 19.046316623687744,
    force: 0.0147,
  },
  {
    time: 19.159614086151123,
    force: 0.0195,
  },
  {
    time: 19.26823878288269,
    force: 0.0181,
  },
  {
    time: 19.357872009277344,
    force: 0.0139,
  },
  {
    time: 19.4691002368927,
    force: 0.0266,
  },
  {
    time: 19.58722186088562,
    force: 0.0215,
  },
  {
    time: 19.68058943748474,
    force: 0.0405,
  },
  {
    time: 19.791773796081543,
    force: 0.043,
  },
  {
    time: 19.891812562942505,
    force: 0.0314,
  },
  {
    time: 19.99213409423828,
    force: 0.0501,
  },
  {
    time: 20.092439651489258,
    force: 0.0303,
  },
  {
    time: 20.210603713989258,
    force: 0.0368,
  },
  {
    time: 20.317769765853882,
    force: 0.0345,
  },
  {
    time: 20.42554521560669,
    force: 0.0484,
  },
  {
    time: 20.51504898071289,
    force: 0.0473,
  },
  {
    time: 20.62744426727295,
    force: 0.0399,
  },
  {
    time: 20.737202405929565,
    force: 0.028,
  },
  {
    time: 20.82730531692505,
    force: 0.0543,
  },
  {
    time: 20.941998958587646,
    force: 0.0493,
  },
  {
    time: 21.04222297668457,
    force: 0.0456,
  },
  {
    time: 21.14225196838379,
    force: 0.0419,
  },
  {
    time: 21.251747369766235,
    force: 0.0521,
  },
  {
    time: 21.3612117767334,
    force: 0.0529,
  },
  {
    time: 21.464633464813232,
    force: 0.0529,
  },
  {
    time: 21.574658155441284,
    force: 0.049,
  },
  {
    time: 21.685197114944458,
    force: 0.0433,
  },
  {
    time: 21.794755697250366,
    force: 0.0572,
  },
  {
    time: 21.917253255844116,
    force: 0.0597,
  },
  {
    time: 22.028454065322876,
    force: 0.0552,
  },
  {
    time: 22.1433162689209,
    force: 0.0292,
  },
  {
    time: 22.25144863128662,
    force: 0.0266,
  },
  {
    time: 22.3618106842041,
    force: 0.0102,
  },
  {
    time: 22.451441287994385,
    force: 0.0549,
  },
  {
    time: 22.5628764629364,
    force: 0.0657,
  },
  {
    time: 22.673890829086304,
    force: 0.0645,
  },
  {
    time: 22.774113655090332,
    force: 0.0611,
  },
  {
    time: 22.874812126159668,
    force: 0.0555,
  },
  {
    time: 22.98559308052063,
    force: 0.056,
  },
  {
    time: 23.09473466873169,
    force: 0.0628,
  },
  {
    time: 23.185786724090576,
    force: 0.06,
  },
  {
    time: 23.29849123954773,
    force: 0.0773,
  },
  {
    time: 23.40778875350952,
    force: 0.0628,
  },
  {
    time: 23.49735426902771,
    force: 0.0575,
  },
  {
    time: 23.60869550704956,
    force: 0.0594,
  },
  {
    time: 23.71994161605835,
    force: 0.0648,
  },
  {
    time: 23.83164882659912,
    force: 0.0651,
  },
  {
    time: 23.933401584625244,
    force: 0.086,
  },
  {
    time: 24.04575204849243,
    force: 0.0719,
  },
  {
    time: 24.153855323791504,
    force: 0.0699,
  },
  {
    time: 24.266085147857666,
    force: 0.0693,
  },
  {
    time: 24.37666630744934,
    force: 0.0648,
  },
  {
    time: 24.4795982837677,
    force: 0.0665,
  },
  {
    time: 24.576777935028076,
    force: 0.0674,
  },
  {
    time: 24.688119649887085,
    force: 0.0702,
  },
  {
    time: 24.800098419189453,
    force: 0.081,
  },
  {
    time: 24.910279512405396,
    force: 0.0518,
  },
  {
    time: 24.999635219573975,
    force: 0.049,
  },
  {
    time: 25.110854148864746,
    force: 0.0526,
  },
  {
    time: 25.222309589385986,
    force: 0.0648,
  },
  {
    time: 25.333025217056274,
    force: 0.0812,
  },
  {
    time: 25.422430515289307,
    force: 0.0747,
  },
  {
    time: 25.523676872253418,
    force: 0.0688,
  },
  {
    time: 25.62277841567993,
    force: 0.075,
  },
  {
    time: 25.73418140411377,
    force: 0.0866,
  },
  {
    time: 25.85070276260376,
    force: 0.0812,
  },
  {
    time: 25.956064224243164,
    force: 0.0897,
  },
  {
    time: 26.050724744796753,
    force: 0.0713,
  },
  {
    time: 26.15692639350891,
    force: 0.0784,
  },
  {
    time: 26.26783847808838,
    force: 0.0648,
  },
  {
    time: 26.35870623588562,
    force: 0.0696,
  },
  {
    time: 26.468650817871094,
    force: 0.0546,
  },
  {
    time: 26.57968544960022,
    force: 0.0855,
  },
  {
    time: 26.680962562561035,
    force: 0.0716,
  },
  {
    time: 26.785699605941772,
    force: 0.0722,
  },
  {
    time: 26.89249300956726,
    force: 0.0767,
  },
  {
    time: 27.002086639404297,
    force: 0.062,
  },
  {
    time: 27.09181523323059,
    force: 0.079,
  },
  {
    time: 27.202854871749878,
    force: 0.0696,
  },
  {
    time: 27.32484531402588,
    force: 0.0651,
  },
  {
    time: 27.436122179031372,
    force: 0.0685,
  },
  {
    time: 27.549938201904297,
    force: 0.0549,
  },
  {
    time: 27.658907175064087,
    force: 0.0614,
  },
  {
    time: 27.747779369354248,
    force: 0.0541,
  },
  {
    time: 27.85943078994751,
    force: 0.0546,
  },
  {
    time: 27.97074794769287,
    force: 0.0699,
  },
  {
    time: 28.074894189834595,
    force: 0.0645,
  },
  {
    time: 28.182446718215942,
    force: 0.0696,
  },
  {
    time: 28.28250527381897,
    force: 0.0461,
  },
  {
    time: 28.39964270591736,
    force: 0.0306,
  },
  {
    time: 28.50949478149414,
    force: 0.0045,
  },
  {
    time: 28.619251489639282,
    force: 0.0512,
  },
  {
    time: 28.729028940200806,
    force: 0.0617,
  },
  {
    time: 28.838866472244263,
    force: 0.0507,
  },
  {
    time: 28.933037996292114,
    force: 0.0626,
  },
  {
    time: 29.04952073097229,
    force: 0.0699,
  },
  {
    time: 29.140790224075317,
    force: 0.0793,
  },
  {
    time: 29.25287890434265,
    force: 0.0671,
  },
  {
    time: 29.366284370422363,
    force: 0.0696,
  },
  {
    time: 29.472463607788086,
    force: 0.0696,
  },
  {
    time: 29.56333303451538,
    force: 0.0594,
  },
  {
    time: 29.674668788909912,
    force: 0.0552,
  },
  {
    time: 29.790313720703125,
    force: 0.041,
  },
  {
    time: 29.899253129959106,
    force: 0.0453,
  },
];

const FORCE_THRESHOLD = 0.08; // Threshold for force spike
const WARNING_THRESHOLD = 0.03; // Threshold for early warning
const ANALYSIS_WINDOW = 3; // Number of points to analyze for trend
const BASE_VIBRATION_DURATION = 100; // Base duration for vibration in ms
const VIBRATION_INTERVAL = 500; // How often to update vibration (ms)

// Helper function to ensure valid number data
const ensureValidNumber = (value) => {
  return typeof value === "number" && !isNaN(value) ? value : 0;
};

export default function UserScreen({ navigation }) {
  // Destructure navigation prop
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentData, setRecentData] = useState([]);
  const [lastAlert, setLastAlert] = useState(null);
  const [chartError, setChartError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vibrationAmplitude, setVibrationAmplitude] = useState(1.0);

  const intervalRef = useRef(null);
  const vibrationIntervalRef = useRef(null);
  const currentForceRef = useRef(0);

  const generateSineWaveVibration = useCallback((force, amplitude) => {
    const normalizedForce = force / FORCE_THRESHOLD;
    const frequency = 2 * Math.PI * normalizedForce;
    const time = Date.now() / 1000;
    const sineValue = Math.sin(frequency * time);
    const vibrationDuration =
      BASE_VIBRATION_DURATION + sineValue * BASE_VIBRATION_DURATION * amplitude;

    return Math.max(0, Math.round(vibrationDuration));
  }, []);

  const updateVibration = useCallback(() => {
    if (isPlaying && currentForceRef.current > 0) {
      const duration = generateSineWaveVibration(
        currentForceRef.current,
        vibrationAmplitude
      );

      if (duration > 0) {
        if (Platform.OS !== "web") {
          Vibration.vibrate([0, duration]);
          Haptics.impactAsync(
            currentForceRef.current >= FORCE_THRESHOLD
              ? Haptics.ImpactFeedbackStyle.Rigid
              : null
          );
        }
      }
    }
  }, [isPlaying, vibrationAmplitude, generateSineWaveVibration]);

  useEffect(() => {
    if (isPlaying) {
      vibrationIntervalRef.current = setInterval(
        updateVibration,
        VIBRATION_INTERVAL
      );
    } else {
      if (vibrationIntervalRef.current) {
        clearInterval(vibrationIntervalRef.current);
        if (Platform.OS !== "web") {
          Vibration.cancel();
        }
      }
    }

    return () => {
      if (vibrationIntervalRef.current) {
        clearInterval(vibrationIntervalRef.current);
        if (Platform.OS !== "web") {
          Vibration.cancel();
        }
      }
    };
  }, [isPlaying, updateVibration]);

  // Prepare chart data with validation
  const getChartData = () => {
    try {
      if (recentData.length === 0) {
        return {
          labels: [],
          datasets: [{ data: [0] }], // Provide default data
        };
      }

      // Ensure all data points are valid numbers
      const validData = recentData.map((point) => ({
        ...point,
        force: ensureValidNumber(point.force),
      }));

      return {
        labels: validData.map((d) => d.time.toFixed(2)),
        datasets: [
          {
            data: validData.map((d) => d.force),
          },
        ],
      };
    } catch (error) {
      console.log("Chart data preparation error:", error);
      setChartError(error.message);
      // Return safe fallback data
      return {
        labels: [],
        datasets: [{ data: [0] }],
      };
    }
  };

  // Function to analyze force trend with validation
  const analyzeForceTrend = (data) => {
    try {
      if (data.length < 2) return 0;
      const recentPoints = data.slice(-ANALYSIS_WINDOW);
      const slopes = [];

      for (let i = 1; i < recentPoints.length; i++) {
        const currentForce = ensureValidNumber(recentPoints[i].force);
        const previousForce = ensureValidNumber(recentPoints[i - 1].force);
        slopes.push(currentForce - previousForce);
      }

      return slopes.length > 0
        ? slopes.reduce((acc, slope) => acc + slope, 0) / slopes.length
        : 0;
    } catch (error) {
      console.log("Trend analysis error:", error);
      return 0;
    }
  };

  // Function to trigger haptic feedback
  const triggerHapticFeedback = async (forceValue, trend) => {
    try {
      const force = ensureValidNumber(forceValue);

      if (force >= FORCE_THRESHOLD) {
        // Vibration.vibrate([0, 500, 200, 500]);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setLastAlert("CRITICAL: Force threshold exceeded!");
      } else if (force >= WARNING_THRESHOLD || trend > 0.5) {
        // Vibration.vibrate([0, 500]);
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Warning
        );
        setLastAlert("WARNING: Approaching force threshold");
      }
    } catch (error) {
      console.log("Haptic feedback error:", error);
    }
  };

  // Simulate real-time data updates
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        try {
          if (currentIndex < FORCE_DATA.length) {
            const newData = FORCE_DATA[currentIndex];

            if (newData && typeof newData.force === "number") {
              currentForceRef.current = newData.force;
              setRecentData((prev) => [...prev, newData].slice(-10));
              setCurrentIndex((prev) => prev + 1);

              // Analyze trend and trigger feedback
              const trend = analyzeForceTrend([...recentData, newData]);
              triggerHapticFeedback(newData.force, trend);
            }
          } else {
            setIsPlaying(false);
          }
        } catch (error) {
          console.log("Data update error:", error);
          setIsPlaying(false);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, recentData]);

  // Playback controls
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetPlayback = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setRecentData([]);
    currentForceRef.current = 0;
    Vibration.cancel();
  };

  // Firestore Listener to Trigger Vibration Playback
  useEffect(() => {
    const vibrationQuery = query(
      collection(db, "vibrations"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      vibrationQuery,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            Alert.alert(
              "Vibration Triggered",
              "Admin has triggered a vibration sequence."
            );
            setIsPlaying(true);
            // Optionally, reset playback before starting
            resetPlayback();
            setIsPlaying(true);
          }
        });
      },
      (error) => {
        console.log("Error listening to vibrations:", error);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Force Feedback Monitor</Text>
      {/* Playback Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={togglePlayback}>
          <MaterialCommunityIcons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#1a73e8"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={resetPlayback}>
          <MaterialCommunityIcons name="refresh" size={24} color="#1a73e8" />
        </TouchableOpacity>
      </View>

      {/* Amplitude Control */}
      <View style={styles.amplitudeControl}>
        <Text style={styles.amplitudeLabel}>
          Vibration Amplitude: {vibrationAmplitude.toFixed(2)}
        </Text>
        <Slider
          style={styles.slider}
          value={vibrationAmplitude}
          onValueChange={setVibrationAmplitude}
          minimumValue={0}
          maximumValue={2}
          step={0.1}
          minimumTrackTintColor="#1a73e8"
          maximumTrackTintColor="#000000"
        />
      </View>

      {/* Force Graph with Error Handling */}
      {recentData.length > 0 ? (
        <View style={styles.chartContainer}>
          {chartError ? (
            <View style={styles.chartError}>
              <Text style={styles.errorText}>Chart Error: {chartError}</Text>
            </View>
          ) : (
            <LineChart
              data={getChartData()}
              width={Dimensions.get("window").width - 20}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#0000ff",
                },
              }}
              bezier
              style={styles.chart}
            />
          )}
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text>Waiting for data...</Text>
        </View>
      )}

      {/* Current Force Display with Validation */}
      {recentData.length > 0 && (
        <View style={styles.currentForce}>
          <Text style={styles.forceLabel}>Current Force:</Text>
          <Text
            style={[
              styles.forceValue,
              {
                color:
                  recentData[recentData.length - 1].force >= FORCE_THRESHOLD
                    ? "red"
                    : recentData[recentData.length - 1].force >=
                      WARNING_THRESHOLD
                    ? "orange"
                    : "green",
              },
            ]}
          >
            {ensureValidNumber(recentData[recentData.length - 1].force).toFixed(
              2
            )}{" "}
            N
          </Text>
        </View>
      )}

      {/* Alert Display */}
      {lastAlert && (
        <View
          style={[
            styles.alert,
            {
              backgroundColor: lastAlert.includes("CRITICAL")
                ? "#ffebee"
                : "#fff3e0",
            },
          ]}
        >
          <Text style={styles.alertText}>{lastAlert}</Text>
        </View>
      )}

      {/* Thresholds Display */}
      <View style={styles.thresholds}>
        <Text style={styles.thresholdText}>
          Warning Threshold: {WARNING_THRESHOLD} N
        </Text>
        <Text style={styles.thresholdText}>
          Critical Threshold: {FORCE_THRESHOLD} N
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  controlButton: {
    padding: 12,
    backgroundColor: "#e5f0ff",
    borderRadius: 25,
    marginHorizontal: 10,
  },
  amplitudeControl: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  amplitudeLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#334155",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  chartError: {
    padding: 20,
    backgroundColor: "#ffe6e6",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  currentForce: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  forceLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  forceValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  alert: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  alertText: {
    fontSize: 16,
    fontWeight: "500",
  },
  thresholds: {
    width: "100%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
  },
  thresholdText: {
    fontSize: 14,
    marginVertical: 2,
  },
});
