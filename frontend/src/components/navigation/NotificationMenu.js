import { memo } from "react";
import "./NotificationMenu.css";

function NotificationMenu() {
  console.log("NotificationMenu Rendered...");

  return (
    // <div className="flex">

    <header className="bg-gradient-to-br from-red-200 to-pink-50 notify-layout">
      <div>Notification Menu</div>
      <div className="font-bold text-xl">MBF ERP Admin</div>

      <div>Login</div>
    </header>
    // </div>
  );
}

export default memo(NotificationMenu);
