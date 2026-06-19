import Database from 'better-sqlite3';

let dbInstance: Database.Database | null = null;

function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database('./upsky.db');
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('busy_timeout = 10000');
    dbInstance.pragma('synchronous = NORMAL');
  }
  return dbInstance;
}

export const db = getDb();

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      agency_name TEXT,
      contact_person TEXT,
      phone TEXT,
      city TEXT,
      country TEXT,
      balance REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS umrah_packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      airline TEXT NOT NULL,
      airline_logo TEXT,
      departure_date TEXT NOT NULL,
      return_date TEXT NOT NULL,
      days INTEGER,
      price REAL NOT NULL,
      visa_price REAL DEFAULT 0,
      hotel_makkah TEXT,
      hotel_madina TEXT,
      transport_included INTEGER DEFAULT 0,
      type TEXT DEFAULT 'umrah',
      status TEXT DEFAULT 'active',
      image_url TEXT,
      sharing_price REAL DEFAULT 0,
      double_price REAL DEFAULT 0,
      triple_price REAL DEFAULT 0,
      quad_price REAL DEFAULT 0,
      quint_price REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS one_way_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      destination TEXT NOT NULL,
      departure_date TEXT NOT NULL,
      return_date TEXT,
      airline TEXT,
      price REAL NOT NULL,
      seats INTEGER DEFAULT 0,
      available_seats INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS umrah_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      departure_date TEXT NOT NULL,
      return_date TEXT,
      airline TEXT,
      price REAL NOT NULL,
      days INTEGER DEFAULT 0,
      seats INTEGER DEFAULT 0,
      available_seats INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      rating REAL,
      address TEXT,
      distance TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS hotel_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER NOT NULL,
      date_from TEXT,
      date_to TEXT,
      sharing_price REAL,
      double_price REAL,
      triple_price REAL,
      quad_price REAL,
      quint_price REAL,
      FOREIGN KEY (hotel_id) REFERENCES hotels(id)
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      reference_id TEXT,
      package_id INTEGER,
      group_id INTEGER,
      adults INTEGER DEFAULT 0,
      infants INTEGER DEFAULT 0,
      total_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      notes TEXT,
      room_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (agent_id) REFERENCES agents(id)
    );

    CREATE TABLE IF NOT EXISTS bank_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      bank_name TEXT NOT NULL,
      account_title TEXT NOT NULL,
      account_number TEXT NOT NULL,
      iban TEXT,
      branch TEXT,
      is_default INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (agent_id) REFERENCES agents(id)
    );

    CREATE TABLE IF NOT EXISTS ledger (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      balance REAL NOT NULL,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (agent_id) REFERENCES agents(id)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      method TEXT,
      status TEXT DEFAULT 'pending',
      reference TEXT,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      FOREIGN KEY (agent_id) REFERENCES agents(id)
    );

    CREATE TABLE IF NOT EXISTS downloads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      file_url TEXT,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      subject TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migration: add missing columns to umrah_packages
  const pkgCols = db.prepare(`PRAGMA table_info(umrah_packages)`).all() as any[];
  const pkgColNames = pkgCols.map((c) => c.name);
  if (!pkgColNames.includes('image_url')) {
    db.exec(`ALTER TABLE umrah_packages ADD COLUMN image_url TEXT`);
  }
  if (!pkgColNames.includes('sharing_price')) {
    db.exec(`ALTER TABLE umrah_packages ADD COLUMN sharing_price REAL DEFAULT 0`);
  }
  if (!pkgColNames.includes('double_price')) {
    db.exec(`ALTER TABLE umrah_packages ADD COLUMN double_price REAL DEFAULT 0`);
  }
  if (!pkgColNames.includes('triple_price')) {
    db.exec(`ALTER TABLE umrah_packages ADD COLUMN triple_price REAL DEFAULT 0`);
  }
  if (!pkgColNames.includes('quad_price')) {
    db.exec(`ALTER TABLE umrah_packages ADD COLUMN quad_price REAL DEFAULT 0`);
  }
  if (!pkgColNames.includes('quint_price')) {
    db.exec(`ALTER TABLE umrah_packages ADD COLUMN quint_price REAL DEFAULT 0`);
  }

  // Migration: add missing columns to bookings
  const bookCols = db.prepare(`PRAGMA table_info(bookings)`).all() as any[];
  const bookColNames = bookCols.map((c) => c.name);
  if (!bookColNames.includes('room_type')) {
    db.exec(`ALTER TABLE bookings ADD COLUMN room_type TEXT`);
  }
}

export function seedDb() {
  const agentCount = db.prepare('SELECT COUNT(*) as count FROM agents').get() as { count: number };
  if (agentCount.count === 0) {
    db.prepare(`
      INSERT INTO agents (code, email, password, agency_name, contact_person, phone, city, country, balance)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run('7902', 'hafizmuhammadsiddique7@gmail.com', '1781025612', 'MUSA Hajj and Umrah travel services pvt Ltd', 'Siddique Hafiz', '03314396349', 'Lahore', 'Pakistan', 0);
  }

  const pkgCount = db.prepare('SELECT COUNT(*) as count FROM umrah_packages').get() as { count: number };
  if (pkgCount.count === 0) {
    const packages = [
      ['Umrah by Air - Saudia', 'Saudia', '2026-07-15', '2026-07-25', 10, 145000, 18000, 'Swissotel Makkah', 'Movenpick Madina', 'https://images.unsplash.com/photo-1542317805-56f3415e0e94?w=800&auto=format&fit=crop', 145000, 175000, 155000, 145000, 140000],
      ['Umrah by Air - PIA', 'PIA', '2026-07-20', '2026-07-30', 10, 135000, 18000, 'Hilton Makkah', 'Pullman Zamzam', 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop', 135000, 165000, 145000, 135000, 130000],
      ['Umrah by Air - Airblue', 'Airblue', '2026-08-05', '2026-08-15', 10, 125000, 18000, 'Makkah Clock Royal', 'Movenpick Anwar', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop', 125000, 155000, 135000, 125000, 120000],
      ['Umrah by Air - SereneAir', 'SereneAir', '2026-08-10', '2026-08-20', 10, 120000, 18000, 'Raffles Makkah', 'Dar Al Taqwa', 'https://images.unsplash.com/photo-1527612820672-5b56351f7346?w=800&auto=format&fit=crop', 120000, 150000, 130000, 120000, 115000],
      ['Umrah Package July', 'Saudia', '2026-07-01', '2026-07-12', 11, 155000, 18000, 'Conrad Makkah', 'Shaza Madina', 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop', 155000, 185000, 165000, 155000, 150000],
      ['Umrah Package August', 'PIA', '2026-08-01', '2026-08-12', 11, 140000, 18000, 'Hyatt Regency', 'Marriott Madina', 'https://images.unsplash.com/photo-1591604129939-f1e9408a4f31?w=800&auto=format&fit=crop', 140000, 170000, 150000, 140000, 135000],
    ];
    const insertPkg = db.prepare(`INSERT INTO umrah_packages (title, airline, departure_date, return_date, days, price, visa_price, hotel_makkah, hotel_madina, image_url, sharing_price, double_price, triple_price, quad_price, quint_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    for (const p of packages) insertPkg.run(...p);
  }

  const owgCount = db.prepare('SELECT COUNT(*) as count FROM one_way_groups').get() as { count: number };
  if (owgCount.count === 0) {
    const groups = [
      ['One Way Jeddah Group', 'Jeddah', '2026-07-10', null, 'Saudia', 45000, 50, 45],
      ['One Way Madina Group', 'Madina', '2026-07-18', null, 'PIA', 52000, 40, 38],
      ['One Way Riyadh Group', 'Riyadh', '2026-08-05', null, 'Airblue', 38000, 60, 55],
    ];
    const insertOwg = db.prepare(`INSERT INTO one_way_groups (title, destination, departure_date, return_date, airline, price, seats, available_seats) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    for (const g of groups) insertOwg.run(...g);
  }

  const ugCount = db.prepare('SELECT COUNT(*) as count FROM umrah_groups').get() as { count: number };
  if (ugCount.count === 0) {
    const groups = [
      ['Umrah Group July 1', '2026-07-05', '2026-07-15', 'Saudia', 95000, 10, 30, 28],
      ['Umrah Group July 2', '2026-07-12', '2026-07-22', 'PIA', 92000, 10, 30, 25],
      ['Umrah Group August 1', '2026-08-08', '2026-08-18', 'Airblue', 88000, 10, 30, 30],
    ];
    const insertUg = db.prepare(`INSERT INTO umrah_groups (title, departure_date, return_date, airline, price, days, seats, available_seats) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    for (const g of groups) insertUg.run(...g);
  }

  const hotelCount = db.prepare('SELECT COUNT(*) as count FROM hotels').get() as { count: number };
  if (hotelCount.count === 0) {
    db.prepare(`INSERT INTO hotels (name, city, rating, address, distance) VALUES (?, ?, ?, ?, ?)`)
      .run('VOCO', 'Makkah', 4.5, 'UMMUL QURA STREET, IN THE AL', '100.00 Meters');
    db.prepare(`INSERT INTO hotel_rates (hotel_id, date_from, date_to, sharing_price, double_price, triple_price, quad_price, quint_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(1, '2026-06-27', '2026-07-31', 110, 110, 110, 110, 0);
  }

  const adminCount = db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number };
  if (adminCount.count === 0) {
    db.prepare(`INSERT INTO admins (username, email, password, name, role) VALUES (?, ?, ?, ?, ?)`)
      .run('admin', 'admin@musatravelservice.pk', 'admin123', 'System Admin', 'admin');
  }

  const downloadCount = db.prepare('SELECT COUNT(*) as count FROM downloads').get() as { count: number };
  if (downloadCount.count === 0) {
    db.prepare(`INSERT INTO downloads (title, file_url, category) VALUES (?, ?, ?)`).run('Umrah Packages Brochure 2026', '/downloads/brochure.pdf', 'Brochure');
    db.prepare(`INSERT INTO downloads (title, file_url, category) VALUES (?, ?, ?)`).run('Rate Sheet July 2026', '/downloads/rates-july.pdf', 'Rates');
    db.prepare(`INSERT INTO downloads (title, file_url, category) VALUES (?, ?, ?)`).run('Agent Terms & Conditions', '/downloads/terms.pdf', 'Legal');
  }
}

initDb();
seedDb();
