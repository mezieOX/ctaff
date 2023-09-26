import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
  backgroundColor: "#37254b",
  color: "white",
};

export const theme = extendTheme({
  colors: {
    primary: {
      default: "#0866FF",
      lighter: "#54C7EC",
      normal: "#80ABFF",
    },
    warning: {
      default: "#FA383E",
    },
    white: "#fff",
    gray: {
      default: "#CFD1D5",
      lighter: "#E4E6EB",
    },
    black: "#000",
    success: {
      default: "#9360F7",
    },
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "inherit",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});
// export const theme = extendTheme({
//   components: {
//     Form: {
//       variants: {
//         floating: {
//           container: {
//             _focusWithin: {
//               label: {
//                 ...activeLabelStyles
//               }
//             },
//             "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
//               ...activeLabelStyles
//             },
//             label: {
//               top: 0,
//               left: 0,
//               zIndex: 2,
//               position: "absolute",
//               backgroundColor: "inherit",
//               pointerEvents: "none",
//               mx: 3,
//               px: 1,
//               my: 2,
//               transformOrigin: "left top"
//             }
//           }
//         }
//       }
//     }
//   }
// });
