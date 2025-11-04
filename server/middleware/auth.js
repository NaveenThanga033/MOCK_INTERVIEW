import { clerkClient } from '@clerk/clerk-sdk-node';

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const session = await clerkClient.verifyToken(token);
    
    if (!session) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Get user details from Clerk
    const user = await clerkClient.users.getUser(session.sub);
    req.user = user;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export default { authenticateUser };