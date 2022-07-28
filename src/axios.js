import axios from "axios";

// using axios our js.fetch api for this build

const instance = axios.create({
    // Upgrade firebase plan to blaze In Firebase
    // ON TERMINAL cd into amazon-clone >> functions >> then run command firebase deploy --only functions
    // Then go into firebase functions grab function Request and past in the baseURL
    
    baseURL: "http://localhost:5001/clone-f5f63/us-central1/api" //   THE API (cloud function) URL
    
});

export default instance;