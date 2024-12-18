// Import reportWebVitals from 'web-vitals'
import { reportWebVitals as reportWebVitalsLibrary } from 'web-vitals';

// Rename your local function to avoid conflicts
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Use reportWebVitalsLibrary instead of reportWebVitals in your code
export default reportWebVitals;
