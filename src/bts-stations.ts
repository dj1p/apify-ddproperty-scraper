import type { BtsStation } from './types.js';

export const BTS_STATIONS: BtsStation[] = [
    // Sukhumvit Line
    { name: 'Mo Chit', nameTh: 'หมอชิต', line: 'BTS Sukhumvit', lat: 13.8028, lng: 100.5534 },
    { name: 'Saphan Khwai', nameTh: 'สะพานควาย', line: 'BTS Sukhumvit', lat: 13.7965, lng: 100.5505 },
    { name: 'Ari', nameTh: 'อารีย์', line: 'BTS Sukhumvit', lat: 13.7893, lng: 100.5490 },
    { name: 'Sanam Pao', nameTh: 'สนามเป้า', line: 'BTS Sukhumvit', lat: 13.7830, lng: 100.5469 },
    { name: 'Victory Monument', nameTh: 'อนุสาวรีย์ชัยสมรภูมิ', line: 'BTS Sukhumvit', lat: 13.7651, lng: 100.5375 },
    { name: 'Phaya Thai', nameTh: 'พญาไท', line: 'BTS Sukhumvit', lat: 13.7564, lng: 100.5339 },
    { name: 'Ratchathewi', nameTh: 'ราชเทวี', line: 'BTS Sukhumvit', lat: 13.7481, lng: 100.5339 },
    { name: 'Siam', nameTh: 'สยาม', line: 'BTS Sukhumvit', lat: 13.7455, lng: 100.5330 },
    { name: 'Chit Lom', nameTh: 'ชิดลม', line: 'BTS Sukhumvit', lat: 13.7441, lng: 100.5406 },
    { name: 'Phloen Chit', nameTh: 'เพลินจิต', line: 'BTS Sukhumvit', lat: 13.7430, lng: 100.5467 },
    { name: 'Nana', nameTh: 'นานา', line: 'BTS Sukhumvit', lat: 13.7401, lng: 100.5556 },
    { name: 'Asok', nameTh: 'อโศก', line: 'BTS Sukhumvit', lat: 13.7361, lng: 100.5601 },
    { name: 'Phrom Phong', nameTh: 'พร้อมพงษ์', line: 'BTS Sukhumvit', lat: 13.7305, lng: 100.5694 },
    { name: 'Thong Lo', nameTh: 'ทองหล่อ', line: 'BTS Sukhumvit', lat: 13.7253, lng: 100.5786 },
    { name: 'Ekkamai', nameTh: 'เอกมัย', line: 'BTS Sukhumvit', lat: 13.7199, lng: 100.5864 },
    { name: 'Phra Khanong', nameTh: 'พระโขนง', line: 'BTS Sukhumvit', lat: 13.7143, lng: 100.5943 },
    { name: 'On Nut', nameTh: 'อ่อนนุช', line: 'BTS Sukhumvit', lat: 13.7060, lng: 100.6007 },
    { name: 'Bang Chak', nameTh: 'บางจาก', line: 'BTS Sukhumvit', lat: 13.6975, lng: 100.6049 },
    { name: 'Punnawithi', nameTh: 'ปุณณวิถี', line: 'BTS Sukhumvit', lat: 13.6901, lng: 100.6079 },
    { name: 'Udom Suk', nameTh: 'อุดมสุข', line: 'BTS Sukhumvit', lat: 13.6814, lng: 100.6085 },
    { name: 'Bang Na', nameTh: 'บางนา', line: 'BTS Sukhumvit', lat: 13.6740, lng: 100.6082 },
    { name: 'Bearing', nameTh: 'แบริ่ง', line: 'BTS Sukhumvit', lat: 13.6648, lng: 100.6082 },
    { name: 'Samrong', nameTh: 'สำโรง', line: 'BTS Sukhumvit', lat: 13.6534, lng: 100.6094 },
    // Silom Line
    { name: 'National Stadium', nameTh: 'สนามกีฬาแห่งชาติ', line: 'BTS Silom', lat: 13.7459, lng: 100.5289 },
    { name: 'Sala Daeng', nameTh: 'ศาลาแดง', line: 'BTS Silom', lat: 13.7283, lng: 100.5339 },
    { name: 'Chong Nonsi', nameTh: 'ช่องนนทรี', line: 'BTS Silom', lat: 13.7231, lng: 100.5281 },
    { name: 'Saint Louis', nameTh: 'เซนต์หลุยส์', line: 'BTS Silom', lat: 13.7190, lng: 100.5228 },
    { name: 'Surasak', nameTh: 'สุรศักดิ์', line: 'BTS Silom', lat: 13.7169, lng: 100.5169 },
    { name: 'Saphan Taksin', nameTh: 'สะพานตากสิน', line: 'BTS Silom', lat: 13.7188, lng: 100.5095 },
    { name: 'Krung Thon Buri', nameTh: 'กรุงธนบุรี', line: 'BTS Silom', lat: 13.7211, lng: 100.4976 },
    { name: 'Wongwian Yai', nameTh: 'วงเวียนใหญ่', line: 'BTS Silom', lat: 13.7225, lng: 100.4889 },
];

export const MRT_STATIONS: BtsStation[] = [
    { name: 'Hua Lamphong', nameTh: 'หัวลำโพง', line: 'MRT Blue', lat: 13.7383, lng: 100.5172 },
    { name: 'Sam Yan', nameTh: 'สามย่าน', line: 'MRT Blue', lat: 13.7336, lng: 100.5260 },
    { name: 'Silom', nameTh: 'สีลม', line: 'MRT Blue', lat: 13.7286, lng: 100.5296 },
    { name: 'Lumphini', nameTh: 'ลุมพินี', line: 'MRT Blue', lat: 13.7254, lng: 100.5416 },
    { name: 'Khlong Toei', nameTh: 'คลองเตย', line: 'MRT Blue', lat: 13.7218, lng: 100.5575 },
    { name: 'Queen Sirikit National Convention Centre', nameTh: 'ศูนย์ประชุมแห่งชาติสิริกิติ์', line: 'MRT Blue', lat: 13.7226, lng: 100.5607 },
    { name: 'Sukhumvit', nameTh: 'สุขุมวิท', line: 'MRT Blue', lat: 13.7373, lng: 100.5607 },
    { name: 'Phetchaburi', nameTh: 'เพชรบุรี', line: 'MRT Blue', lat: 13.7474, lng: 100.5607 },
    { name: 'Thailand Cultural Centre', nameTh: 'ศูนย์วัฒนธรรมแห่งประเทศไทย', line: 'MRT Blue', lat: 13.7583, lng: 100.5660 },
    { name: 'Huai Khwang', nameTh: 'ห้วยขวาง', line: 'MRT Blue', lat: 13.7755, lng: 100.5742 },
    { name: 'Sutthisan', nameTh: 'สุทธิสาร', line: 'MRT Blue', lat: 13.7853, lng: 100.5737 },
    { name: 'Ratchadaphisek', nameTh: 'รัชดาภิเษก', line: 'MRT Blue', lat: 13.7942, lng: 100.5695 },
    { name: 'Lat Phrao', nameTh: 'ลาดพร้าว', line: 'MRT Blue', lat: 13.8028, lng: 100.5638 },
    { name: 'Phahon Yothin', nameTh: 'พหลโยธิน', line: 'MRT Blue', lat: 13.8130, lng: 100.5564 },
    { name: 'Chatuchak Park', nameTh: 'สวนจตุจักร', line: 'MRT Blue', lat: 13.8042, lng: 100.5540 },
    { name: 'Kamphaeng Phet', nameTh: 'กำแพงเพชร', line: 'MRT Blue', lat: 13.8022, lng: 100.5500 },
    { name: 'Bang Sue', nameTh: 'บางซื่อ', line: 'MRT Blue', lat: 13.8026, lng: 100.5395 },
    { name: 'Tao Poon', nameTh: 'เตาปูน', line: 'MRT Blue', lat: 13.8059, lng: 100.5285 },
    { name: 'Bang Pho', nameTh: 'บางโพ', line: 'MRT Blue', lat: 13.8088, lng: 100.5138 },
];

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestStation(
    lat: number,
    lng: number,
    stations: BtsStation[],
): { station: BtsStation; distanceKm: number; walkingMinutes: number } | null {
    if (!lat || !lng) return null;

    let nearest: BtsStation | null = null;
    let minDist = Infinity;

    for (const station of stations) {
        const dist = haversineDistance(lat, lng, station.lat, station.lng);
        if (dist < minDist) {
            minDist = dist;
            nearest = station;
        }
    }

    if (!nearest) return null;

    // Approximate walking time: 1 km ≈ 12 minutes on foot
    const walkingMinutes = Math.round(minDist * 12);

    return { station: nearest, distanceKm: Math.round(minDist * 100) / 100, walkingMinutes };
}
