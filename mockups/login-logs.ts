import { UserLoginLogs } from "@/types/model";
import { mockUsers } from "@/mockups/users";

const currentUser = mockUsers[0];

export const mockLoginLogs: UserLoginLogs[] = [
  {
    id: 1,
    user_id: [currentUser.id],
    ip_address: "103.147.9.22",
    device: "Chrome 131 · Windows 11",
    created_at: "2026-09-15 08:30:00",
    updated_at: "2026-09-15 08:30:00",
    user: currentUser,
  },
  {
    id: 2,
    user_id: [currentUser.id],
    ip_address: "103.147.9.22",
    device: "Safari · iPhone 15",
    created_at: "2026-09-14 18:02:41",
    updated_at: "2026-09-14 18:02:41",
    user: currentUser,
  },
  {
    id: 3,
    user_id: [currentUser.id],
    ip_address: "36.81.44.107",
    device: "Chrome 130 · Windows 11",
    created_at: "2026-09-13 09:15:27",
    updated_at: "2026-09-13 09:15:27",
    user: currentUser,
  },
  {
    id: 4,
    user_id: [currentUser.id],
    ip_address: "36.81.44.107",
    device: "Firefox 133 · Ubuntu 24.04",
    created_at: "2026-09-11 20:44:03",
    updated_at: "2026-09-11 20:44:03",
    user: currentUser,
  },
  {
    id: 5,
    user_id: [currentUser.id],
    ip_address: "180.244.71.58",
    device: "Edge 131 · Windows 10",
    created_at: "2026-09-09 07:58:19",
    updated_at: "2026-09-09 07:58:19",
    user: currentUser,
  },
  {
    id: 6,
    user_id: [currentUser.id],
    ip_address: "180.244.71.58",
    device: "Chrome · Android 14",
    created_at: "2026-09-06 19:21:55",
    updated_at: "2026-09-06 19:21:55",
    user: currentUser,
  },
  {
    id: 7,
    user_id: [currentUser.id],
    ip_address: "103.147.9.22",
    device: "Safari 18 · macOS Sequoia",
    created_at: "2026-09-02 10:07:33",
    updated_at: "2026-09-02 10:07:33",
    user: currentUser,
  },
  {
    id: 8,
    user_id: [currentUser.id],
    ip_address: "36.81.44.107",
    device: "Chrome 129 · Windows 11",
    created_at: "2026-08-28 14:36:48",
    updated_at: "2026-08-28 14:36:48",
    user: currentUser,
  },
];
