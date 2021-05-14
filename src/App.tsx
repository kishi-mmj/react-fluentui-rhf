import {createTheme, initializeIcons, loadTheme, setIconOptions, ThemeProvider} from "@fluentui/react";
import React from 'react';
import './App.css';
import {Form} from "./Form";

loadTheme(createTheme({
    defaultFontStyle: {
        // todo ライセンスの関係でfont､ iconを変更する必要がある。 https://qiita.com/yoh1496/items/aa39084b1c0b97b70e07
        fontFamily: 'Comic Sans MS',
        // fontWeight: 'bold'
    },
    fonts: {
        // medium: { fontSize: 50 }
    }
}));

function App() {

    initializeIcons();
    setIconOptions({disableWarnings:true}) // warningを削除 https://stackoverflow.com/questions/64131605/how-to-remove-or-handle-icons-were-reregistered-warning-in-react

    return (
        <ThemeProvider>
            <div className="App">
                <Form/>
            </div>
        </ThemeProvider>
    );
}

export default App;
