import { Menu } from "antd";

export default function Sidebar() {
  return (
    <div className="h-screen bg-white">
      <Menu>
        <Menu.SubMenu title="Timeline" key="tl">
          <Menu.Item key="tl1">TestTimeline</Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Menu>
        <Menu.SubMenu title="Tracks" key="tr">
          <Menu.Item key="tr1">TestTrack</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
