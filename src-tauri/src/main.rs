use tauri::api::process::Command;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Launch backend.exe as sidecar
            Command::new_sidecar("backend.exe")
                .expect("failed to setup backend")
                .spawn()
                .expect("failed to spawn backend");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
